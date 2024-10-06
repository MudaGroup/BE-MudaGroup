import fs from "fs";
import missionModel from "../models/missionModel.js";

export const getMission = async(req, res) => {
    try {
        const response = await missionModel.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
};

export const getMissionById = async(req, res) => {
    try {
        const response = await missionModel.findOne({
            where: {
                id: req.params.id,
            },
        });
        res.json(response);
    } catch (error) {
        console.error(error.message);
    }
};

export const saveMission = async(req, res) => {
    const name = req.body.title;  // Mengambil title dari body request

    try {
        await missionModel.create({
            name: name,
        });
        res.status(201).json({ msg: "Product Created Successfully" });
    } catch (error) {
        // Jika ada error, tampilkan di console dan kembalikan error ke client
        console.log(error.message);
        res.status(500).json({ msg: "Failed to create product" });
    }
};

export const updateMission = async(req, res) => {
    const product = await missionModel.findOne({
        where: {
            id: req.params.id,
        },
    });
    if (!product) return res.status(404).json({ msg: "No Data Found" });


    const name = req.body.title;

    try {
        await missionModel.update({
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

export const deleteMission = async(req, res) => {
    const product = await missionModel.findOne({
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