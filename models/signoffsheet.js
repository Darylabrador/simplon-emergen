const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId; 

const signoffsheetSchema = mongoose.Schema({
    urlSheet: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    templateId: {
        type: ObjectId,
        require: true, 
        ref: 'templates'
    },
    apprenants: {
        type: Array
    },
    jours: {
        type: Array
    },
    formateur: {
        type: Array
    },
    periodeDebut: {
        type: String
    },
    periodeFin: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('signoffsheet', signoffsheetSchema);