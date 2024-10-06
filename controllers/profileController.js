import path from "path";
import fs from "fs";
import profileModel from "../models/profileModels.js";

export const getProfile = async(req, res) => {
    try {
        const response = await profileModel.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getProfileById = async(req, res) => {
    try {
        const response = await profileModel.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.json(response);
    } catch (error) {
        console.error(error.message);
    }
}

export const saveProfile = (req, res) => {
    if (req.files === null)
        return res.status(400).json({ msg: "No files Uploaded"});
    const name = req.body.title;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/image/profile/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase()))
        return res.status(422).json({ msg: "Invalid Image" });
    if (fileSize > 10000000)
        return res.status(422).json({ msg: "Image must be less than 10 MB" });

    file.mv(`./public/image/profile/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await profileModel.create({
                name: name,
                image: fileName,
                url: url
            });
            res.status(201).json({ msg: "Product created successfully"});
        } catch (error) {
            console.log(error.message);
            return res.status(500).json({ msg: "Failed to create product" });
        };
    });
}

export const updateProfile = async(req, res) => {
    const product = await profileModel.findOne({
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

        const filepath = `./public/image/profile/${product.image}`;
        fs.unlinkSync(filepath);

        file.mv(`./public/image/profile/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        })
    }

    const name = req.body.title;
    const url = `${req.protocol}://${req.get('host')}/slide/${fileName}`;

    try {
        await profileModel.update({
            name: name,
            image: fileName,
            url: url
        },{
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json({ msg: "Product Update Success"});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteProfile = async(req, res) => {
    const product = await profileModel.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!product) return res.status(404).json({ msg: "No Data Found" });
    try {
        const filepath = `./public/image/profile/${product.image}`;
        fs.unlinkSync(filepath);
        await profileModel.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "Product Deleted Successfully" });
    } catch (error) {
        console.log(error.message);
    }
}