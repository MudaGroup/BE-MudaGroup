import path from "path";
import fs from "fs";
import slideImageModel from "../models/slideImageModel.js";

export const getSlideImage = async (req, res) => {
    try {
        const response = await slideImageModel.findAll();
        res.json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Failed to retrieve images" });
    }
};

export const getSlideImageById = async (req, res) => {
    try {
        const response = await slideImageModel.findOne({
            where: {
                id: req.params.id,
            },
        });
        if (!response) return res.status(404).json({ msg: "No Data Found" });
        res.json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Failed to retrieve image" });
    }
};

export const saveSlideImage = (req, res) => {
    console.log("Received request to save slide image");

    if (!req.files || !req.files.file) {
        console.log("No files uploaded");
        return res.status(400).json({ msg: "No files Uploaded" });
    }

    const name = req.body.title;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/image/slide/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];

    console.log(`File extension: ${ext}`);
    console.log(`File size: ${fileSize} bytes`);

    if (!allowedType.includes(ext.toLowerCase())) {
        console.log("Invalid image type");
        return res.status(422).json({ msg: "Invalid Image" });
    }
    if (fileSize > 10000000) {
        console.log("Image too large");
        return res.status(422).json({ msg: "Image must be less than 10 MB" });
    }

    file.mv(`./public/image/slide/${fileName}`, async (err) => {
        if (err) {
            console.log("Error moving file:", err.message);
            return res.status(500).json({ msg: err.message });
        }

        try {
            await slideImageModel.create({
                name: name,
                image: fileName,
                url: url,
            });
            res.status(201).json({ msg: "Product created successfully" });
        } catch (error) {
            console.error("Error creating product:", error.message);
            return res.status(500).json({ msg: "Failed to create product" });
        }
    });
};

export const updateSlideImage = async (req, res) => {
    const product = await slideImageModel.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!product) return res.status(404).json({ msg: "No Data Found" });

    let fileName = product.image; // Default fileName is the existing image

    if (req.files && req.files.file) {
        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        fileName = file.md5 + ext;
        const allowedType = [".png", ".jpg", ".jpeg"];

        if (!allowedType.includes(ext.toLowerCase()))
            return res.status(422).json({ msg: "Invalid Image" });
        if (fileSize > 10000000)
            return res.status(422).json({ msg: "Image must be less than 10 MB" });

        const filepath = `./public/image/slide/${product.image}`;
        if (fs.existsSync(filepath)) { // Cek apakah file ada sebelum menghapus
            fs.unlinkSync(filepath);
        }

        await file.mv(`./public/image/slide/${fileName}`, (err) => {
            if (err) return res.status(500).json({ msg: err.message });
        });
    }

    const name = req.body.title;
    const url = `${req.protocol}://${req.get("host")}/image/slide/${fileName}`;

    try {
        await slideImageModel.update(
            {
                name: name,
                image: fileName,
                url: url,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );
        res.status(200).json({ msg: "Product Update Success" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: "Failed to update product" });
    }
};

export const deleteSlideImage = async (req, res) => { // Perbaiki nama fungsi
    const product = await slideImageModel.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!product) return res.status(404).json({ msg: "No Data Found" });
    try {
        const filepath = `./public/image/slide/${product.image}`;
        if (fs.existsSync(filepath)) { // Cek apakah file ada sebelum menghapus
            fs.unlinkSync(filepath);
        }
        await slideImageModel.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "Product Deleted Successfully" });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ msg: "Failed to delete product" });
    }
};
