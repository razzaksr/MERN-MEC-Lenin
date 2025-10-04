const car = require('./model')

// CRUD
const getAllRecords = async() => {
    return await car.find()
}

// Create a new car by accept json, convert into schema then insert via save
const createRecord = async(newRecord) => {
    const newCar = new car(newRecord)
    await newCar.save()
    return newCar;
}

// Update record
const updateRecord = async(usereg, updatedRecord) => {
    try{
        const updated = await car.findOneAndUpdate({regno: usereg}, updatedRecord, {new:true});
        return updated;
    }catch(err){
        console.error(err);
        return null;
    }
}

// delete record by regno
const deleteRecord = async(usereg) => {
    try{
        const deleted = await car.findOneAndDelete({regno: usereg});
        return deleted;
    }catch(err){
        console.error(err)
        return null;
    }
}

module.exports = { getAllRecords, createRecord, updateRecord, deleteRecord };