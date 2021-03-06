const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Value must be a valid email address!")
            }
        }
    },
    password: {
        required: true,
        type: String,
        trim: true,
        validate(value) {
            if (value.length < 15) {
                throw new Error("Password must be greater than 15 characters!")
            } else if (value.toLowerCase().includes(['password', 'pass', '12345', '1234', '123', 'qwerty'])) {
                throw new Error("Password can not contain certain common values")

            }
        }
    },
    
    siteMetadata: {
        siteTitle: {
            type: String,
            required: true
        },
        siteDescription: {
            type: String,
            required: true
        }
    },
    userIPAddress: {
        required: true,
        type: String
    },
    userDevices: [{
        device: {
            type: String,
            required: true
        }
    }],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
}, {
    timestamps: true
})


userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.tokens;
    delete userObject.password;
    delete userObject.avatar

    return userObject;
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user.id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })

    await user.save()
    return token
}

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }

    next()
})

// userSchema.pre('remove', async function(next) {
//     const user = this
//     await Game.deleteMany({ owner: user._id })
//     next()
// })

userSchema.statics.findByCredentials = async (email, pass) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error("Unable to login")
    }

    const isValidPass = await bcrypt.compare(pass, user.password)

    if (!isValidPass) {
        throw new Error("Unable to login")
    }

    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User