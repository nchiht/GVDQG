import  db from '../models/index'
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);


let createNewUser = async(data) => {
    return new Promise(async (reslove,reject) => {
        try{
            await db.User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                userName: data.userName,
                password: data.password,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                phoneNumber: data.phoneNumber, 
            })

            reslove('Added user!')
        } catch(e) {
            reject(e);
        }
    })
}

let createTeam = async(data) => {
    return new Promise(async (reslove,reject) => {
        try{
            await db.doiBong.create({
                tenDoiBong: data.teamName,
                sanNha: data.homeGround,
                mauAoSanNha: data.homeJerseyColor,
                mauAoSanKhach: data.awayJerseyColor,
            });
            for (let i=0;i<data.playerData.length; i++)
            {
                await db.cauThu.create({
                    tenCauThu: data.playerData[i][1],
                    soAo: data.playerData[i][2],
                    viTri: data.playerData[i][3],
                    ngaySinh: data.playerData[i][4],
                    chieuCao: data.playerData[i][5],
                    canNang: data.playerData[i][6]
                })
            }      
            reslove('Added Team!')
        } catch(e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise((reslove, reject) => {
    try{
        var hashPassword = bcrypt.hashSync(password, salt);
        reslove(hashPassword);
    } catch(e) {
        reject(e);
    }
    });
}

let getAllUser = () => {
    return new Promise(async(reslove,reject) => {
        try {
            let users = db.User.findAll();
            reslove(users);
        } catch(e){
            reject(e);
        }
    })
}

let getUserInfoById = (userId) => {
    return new Promise(async(reslove, reject) => {
        try {
            let user = await db.User.findOne({
                where: {
                    id: userId,
                }
            })
            if (user)
            {
                reslove(user)
            }
            else
            {
                reslove({})
            }
            reslove(user);
        } catch(e){
            reject(e);
        };
    })
}

let editUser = async(data) => {
    return new Promise(async(reslove,reject) => {
        try{
            let user = await db.User.findOne({
                where: {
                    id: data.id,
                }
            })
            if (user)
            {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.gender = data.gender === '1' ? true : false;

                await user.save();
                reslove('Edited user!');
            }
            else
            {
                reslove();
            }
        } catch(e) {
            reject(e);
        }
    })
}

let deleteUserById = (userId) => {
    return new Promise(async(reslove,reject) => {
        try {
            let user = await db.User.findOne({ where: { id: userId} })
            if (user)
            {
                user.destroy();
            }
            reslove();
        } catch(e) {
            reject(e);
        }
    })
}


module.exports = {
    createNewUser : createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    editUser: editUser,
    deleteUserById: deleteUserById,
    createTeam: createTeam,
}
