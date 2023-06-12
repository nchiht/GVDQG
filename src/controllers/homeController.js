import { render } from "ejs";
import express, { application } from 'express'
import db from "../models/index";
import CRUDSevice from "../sevices/CRUDSevice";

let getHomePage = async (req, res) => {
    try {
        let dataCauThu = await CRUDSevice.getAllCauThu({
            raw: true,
        })
        let dataTongKet = await CRUDSevice.getAllTongKet({
            raw: true,
        });
        let data = await CRUDSevice.getAllUser({
            raw: true,
        });
        let dataDoiBong = await CRUDSevice.getALLDoiBong({
            raw: true,
        });
        let dataLichThiDau = await CRUDSevice.getAllLichThiDau({
            raw: true,
        });
        let dataKetQua = await CRUDSevice.getAllKetQua({
            raw: true,
        })
        let dataTranDau = await CRUDSevice.getAllTranDau({
            raw: true,
        })
        console.log(dataDoiBong);
        return res.render('homepage.ejs', {
            data: JSON.stringify(data),
            dataTongKet: dataTongKet,
            dataCauThu: dataCauThu,
            dataDoiBong: dataDoiBong,
            dataLichThiDauTruoc: dataLichThiDauTruoc,
            dataLichThiDauSau: dataLichThiDauSau,
            dataKetQua: dataKetQua,
            dataTranDau: dataTranDau,
        });
    } catch (e) {
        console.log(e);
    }
}

let getInfoPage = (req, res) => {
    return res.render('infopage.ejs');
}

let getCRUDPage = (req, res) => {
    return res.render('CRUD.ejs');
}

let postCRUD = async (req, res) => {
    let mes = await CRUDSevice.createNewUser(req.body);
    console.log(mes);
    res.redirect('/');
}

let displayGetCRUD = async (req, res) => {
    let data = await CRUDSevice.getAllUser({
        raw: true,
    });
    return res.render('displayCRUD.ejs', {
        dataTable: data
    });
}

let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDSevice.getUserInfoById(userId);
        if (userData) {
            return res.render('edit-CRUD.ejs', {
                user: userData
            })
        }
    } else {
        return res.send('User not found!');
    }
}

let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDSevice.editUser(data);
    let allUsers = await db.User.findAll();
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    });
}

let delCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        await CRUDSevice.deleteUserById(userId);
        let allUsers = await db.User.findAll();
        return res.render('./displayCRUD.ejs', {
            dataTable: allUsers
        });
    } else {
        return res.send('User not found!');
    }
}

let loginCRUD = (req, res) => {
    return res.send('Login')
}

let getManager = async (req, res) => {
    try {
        let data = await CRUDSevice.getAllUser({
            raw: true,
        });
        return res.render('Manager.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
}

let getBanQuanLy = async (req, res) => {
    try {
        let data = await CRUDSevice.getAllUser({
            raw: true,
        });
        let dataDoiBong = await CRUDSevice.getALLDoiBong({
            raw: true,
        })
        let dataThamSo = await CRUDSevice.getAllThamSo({
            raw: true,
        })
        let dataCauThu = await CRUDSevice.getAllCauThu({
            raw: true,
        })
        let dataLichThiDauTruoc = await CRUDSevice.getAllLichThiDauTruoc({
            raw: true,
        });
        let dataLichThiDauSau = await CRUDSevice.getAllLichThiDauSau({
            raw: true,
        });
        let dataKetQua = await CRUDSevice.getAllKetQua({
            raw: true,
        });
        let dataTranDau = await CRUDSevice.getAllTranDau({
            raw: true,
        });
        let dataTongKet = await CRUDSevice.getAllTongKet({
            raw: true,
        });
        return res.render('BanQuanLy.ejs', {
            data: JSON.stringify(data),
            dataDoiBong: dataDoiBong,
            dataThamSo: dataThamSo,
            dataCauThu: dataCauThu,
            parseDataDoiBong: JSON.stringify(dataDoiBong),
            parseDataThamSo: JSON.stringify(dataThamSo),
            dataLichThiDauTruoc: dataLichThiDauTruoc,
            dataLichThiDauSau: dataLichThiDauSau,
            dataKetQua: dataKetQua,
            dataTranDau: dataTranDau,
            dataTongKet: dataTongKet
        });
    } catch (e) {
        console.log(e);
    }
}


let postTeam = async (req, res) => {
    console.log(req.body.playerData.length);
    let mes = await CRUDSevice.createTeam(req.body);
    res.redirect('/banquanly');
}

let postLapLich = async (req, res) => {
    console.log(req.body);
    let mes = await CRUDSevice.createLichThiDau(req.body);
    res.redirect('/banquanly');
}

let postDienBien = async (req, res) => {
    let data = JSON.parse(req.body.dienbien);
    for (let k = 0; k < data.length; k++) {
        let mes = await CRUDSevice.createDienBien(data[k]);
    }
    res.redirect('/banquanly');
}

let getAdmin = async (req, res) => {
    try {
        let data = await CRUDSevice.getAllUser({
            raw: true,
        });
        return res.render('Admin.ejs', {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
    }
}


module.exports = {
    getHomePage: getHomePage,
    getInfoPage: getInfoPage,
    getCRUDPage: getCRUDPage,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    delCRUD: delCRUD,
    loginCRUD: loginCRUD,
    getManager: getManager,
    getBanQuanLy: getBanQuanLy,
    postTeam: postTeam,
    getAdmin: getAdmin,
    postDienBien: postDienBien,
    postLapLich: postLapLich
}
