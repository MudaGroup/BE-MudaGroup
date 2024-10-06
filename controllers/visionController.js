import fs from "fs";
import visionModel from "../models/visionModel.js";

export const getVision = async(req, res) => {
    try {
        const response = await visionModel.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const getVisionById = async(req, res) => {
    try {
        const response = await visionModel.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.json(response);
    } catch (error) {
        console.error(error.message);
    }
};

export const saveVision = async(req, res) => {
    const name = req.body.title;  // Mengambil title dari body request

    try {
        await visionModel.create({
            name: name,
        });
        res.status(201).json({ msg: "Product Created Successfully" });
    } catch (error) {
        // Jika ada error, tampilkan di console dan kembalikan error ke client
        console.log(error.message);
        res.status(500).json({ msg: "Failed to create product" });
    }
};

export const updateVision = async(req, res) => {
    const product = await visionModel.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!product) return res.status(404).json({ msg: "No Data Found" });


    const name = req.body.title;

    try {
        await visionModel.update({
            name: name,
        }, {
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "Product Updated Successfully" });
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteVision = async(req, res) => {
    const product = await visionModel.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!product) return res.status(404).json({ msg: "No Data Found" });
    try {
        await visionModel.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json({ msg: "Product Deleted Successfully" });
    } catch (error) {
        console.log(error.message);
    }
};