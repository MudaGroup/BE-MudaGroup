import path from "path";
import fs from "fs";
import retailModel from "../models/retailModel.js";

export const getRetail = async(req, res) => {
    try {
        const response = await retailModel.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const getRetailById = async(req, res) => {
    try {
        const response = await retailModel.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.json(response);
    } catch (error) {
        console.error(error.message);
    }
};

export const saveRetail = (req, res) => {
    if (req.files === null)
        return res.status(400).json({ msg: "No Files Uploaded" });
    const name = req.body.title;
    const desc = req.body.desc;
    const project_status = req.body.project_status;
    const project_location = req.body.project_location;
    const address = req.body.address;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/image/retail/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Invalid Image"});
    if (fileSize > 10000000)
        return res.status(422).json({ msg: "Image must be less than 10 MB"});

    file.mv(`./public/image/retail/${fileName}`, async(err) => {
        if(err) return res.status(500).json({msg: err.message});
        try {
            await retailModel.create({
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

export const updateRetail = async(req, res) => {
    const product = await retailModel.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!product) return res.status(404).json({ msg: "No Data Found" });
    let fileName = "";
    if (req.files === null) {
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

        const filepath = `./public/image/retail/${product.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/image/retail/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }

    const name = req.body.title;
    const desc = req.body.desc;
    const project_status = req.body.project_status;
    const project_location = req.body.project_location;
    const address = req.body.address;
    const url = `${req.protocol}://${req.get("host")}/image/retail/${fileName};`;

    try {
        await retailModel.update({
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

export const deleteRetail = async(req, res) => {
    const product = await retailModel.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!product) return res.status(404).json({ msg: "No Data Found" });
    try {
        const filepath = `./public/image/retail/${product.image}`;
        fs.unlinkSync(filepath);
        await cageModel.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "Product Deleted Successfully" });
    } catch (error) {
        console.log(error.message);
    }
};
