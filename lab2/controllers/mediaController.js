const path = require('path');
const multer = require('multer');
const MediaRepository = require('./../repositories/mediaRepository');

const mediaRepository = new MediaRepository(path.resolve(__dirname, '../data/media'));

const upload = multer
    ({
        storage: multer.diskStorage
            ({
                destination: function (req, file, cb) {
                    cb(null, mediaRepository.path);
                },
                filename: function (req, file, cb) {
                    const fileFormat = file.mimetype.split('/')[1];
                    cb(null, `${String(mediaRepository.getNextId())}.${fileFormat}`);
                }
            }),
    }).any();

module.exports = {
    async getMediaById(req, res) {
        try {
            const mediaId = Number(req.params.id);
            const path = mediaRepository.getMediaPath(mediaId);
            if (path) {
                res.sendFile(path);
            }
            else {
                res.status(404).send({ media: null, message: 'Not found' });
            }
        } catch (err) {
            console.log(err.message);
            res.status(500).send({ media: null, message: 'Server error' });
        }
    },

    async addMedia(req, res) {
        try {
            upload(req, res, (err) => {
                if (err) {
                    console.log('err ', err.message);
                    res.status(500).send({ media: null, message: 'Server error' });
                } else if (req.files) {
                    res.status(201).send({ mediaId: mediaRepository.getNextId(), message: 'Success. Media added' });
                    mediaRepository.incrementId();
                } else {
                    res.status(400).send({ message: 'Bad request' });
                }
            });
        }
        catch (err) {
            console.log(err.message);
            res.status(500).send({ media: null, message: 'Server error' });
        }
    }
};


