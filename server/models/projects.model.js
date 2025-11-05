import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: 'Project title is required'
    },
    // Time should come right after title
    time: {
        type: String,
        trim: true,
        default: ''
    },
    image: {
        type: String,
        trim: true,
        required: 'Project image is required'
    },
    description: {
        type: String,
        trim: true,
        required: 'Project description is required'
    },
    technologies: [{
        type: String,
        trim: true
    }],
    // Default to empty array for robustness
    skills: {
        type: [String],
        default: []
    },
    role: {
        type: String,
        trim: true,
        required: 'Role is required'
    },
    github: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                if (!v || v.trim() === '') return true;
                return /^https?:\/\/.+/.test(v);
            },
            message: 'Please provide a valid URL'
        }
    },
    liveDemo: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                if (!v || v.trim() === '') return true;
                return /^https?:\/\/.+/.test(v);
            },
            message: 'Please provide a valid URL'
        }
    },
    problemLog: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                if (!v || v.trim() === '') return true;
                return /^https?:\/\/.+/.test(v);
            },
            message: 'Please provide a valid URL'
        }
    },
    testingLog: {
        type: String,
        trim: true,
        validate: {
            validator: function(v) {
                if (!v || v.trim() === '') return true;
                return /^https?:\/\/.+/.test(v);
            },
            message: 'Please provide a valid URL'
        }
    }
}, {
    collection: 'projects'
});

export default mongoose.model('Project', ProjectSchema);


