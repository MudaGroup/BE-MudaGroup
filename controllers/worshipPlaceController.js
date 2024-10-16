import path from "path";
import fs from "fs";
import worshipPlaceModel from "../models/worshipPlaceModel.js";

export const getWorshipPlace = async(req, res) => {
    try {
        const response = await worshipPlaceModel.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const getWorshipPlaceById = async(req, res) => {
    try {
        const response = await worshipPlaceModel.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.json(response);
    } catch (error) {
        console.error(error.message);
    }
};

export const saveWorshipPlace = (req, res) => {
    if (req.files === null)
        return res.status(400).json({ msg: "No Files Uploaded" });
    const name = req.body.name;
    const desc = req.body.desc;
    const project_status = req.body.project_status;
    const project_location = req.body.project_location;
    const address = req.body.address;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/image/worshipPlace/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Invalid Image"});
    if (fileSize > 10000000)
        return res.status(422).json({ msg: "Image must be less than 10 MB"});

    file.mv(`./public/image/worshipPlace/${fileName}`, async(err) => {
        if(err) return res.status(500).json({msg: err.message});
        try {
            await worshipPlaceModel.create({
                name: name,
                desc: desc,
                image: fileName,
                url: url,
                project_status: project_status,
                project_location: project_location,
                address: address,
            });
            res.status(201).json({ msg: "Product Create Successfully"});
        } catch (error) {
            console.log(error.message);
        }
    })
};

export const updateWorshipPlace = async(req, res) => {
    const product = await worshipPlaceModel.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!product) return res.status(404).json({ msg: "No Data Found" });
    let fileName = "";
    if (req.files || !req.files.file) {
        fileName = product.image;
    } else {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = [".png", ".jpg", ".jpeg"];

        if (!allowedType.includes(ext.toLowerCase()))
            return res.status(422).json({ msg: "Invalid Image" });
        if (fileSize > 10000000)
            return res.status(422).json({ msg: "Image must be less than 10 MB" });

        const filepath = `./public/image/worshipPlace/${product.image}`;
        if (fs.existsSync(filepath)) {
            fs.unlink(filepath, (err) => {
                if (err) {
                console.error(err.message);
                    return res.status(500).json({ msg: "Error deleting old image" });
                }
            });
        }

        file.mv(`./public/image/worshipPlace/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }

    const name = req.body.name;
    const desc = req.body.desc;
    const project_status = req.body.project_status;
    const project_location = req.body.project_location;
    const address = req.body.address;
    const url = `${req.protocol}://${req.get("host")}/image/worshipPlace/${fileName};`;

    try {
        await worshipPlaceModel.update({
            name: name,
            desc: desc,
            image: fileName,
            url: url,
            status: project_status,
            location: project_location,
            address: address,
        }, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "Product Update Successfully"});
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteWorshipPlace = async(req, res) => {
    const product = await worshipPlaceModel.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!product) return res.status(404).json({ msg: "No Data Found" });
    try {
        const filepath = `./public/image/worshipPlace/${product.image}`;
        fs.unlinkSync(filepath);
        await worshipPlaceModel.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "Product Deleted Successfully" });
    } catch (error) {
        console.log(error.message);
    }
};
