const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        match: [/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    contact_info: {
        type: String,
        required: [true, 'Please provide contact information']
    },
    isAdmin: {
        type: Boolean
    },
    isPrincipal: {
        type: Boolean
    },
    isTeacher: {
        type: Boolean
    },
    isParent: {
        type: Boolean
    },
    managedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.pre('findOneAndUpdate', async function(next) {
    const update = this.getUpdate();
    if (!update.password || typeof update.password !== 'string') {
        return next();
    }

    try {
        const hashedPassword = await bcrypt.hash(update.password, 10);
        update.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

userSchema.methods.createCookie = async function(res) {
    const userData = {
        userID: this._id,
        isAdmin: this.isAdmin,
        isPrincipal: this.isPrincipal,
        isTeacher: this.isTeacher,
        isParent: this.isParent
    }

    res.cookie('user', userData, { maxAge: 900000, httpOnly: true });

    return userData;
}

module.exports = mongoose.model('User', userSchema);
