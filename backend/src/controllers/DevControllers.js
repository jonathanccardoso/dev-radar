const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async store(request, response) {
      const devs = await Dev.find();
      
      return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs } = request.body;

        let dev = await Dev.findOne({ github_username }); // overlapping

        if (!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
        
            const { name = login, avatar_url, bio } = apiResponse.data;
        
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordenates: [longitude, latitude],
            }
            
            dev = await Dev.create({
                github_username,
                name,
                bio,
                techs: techsArray,
                location,
            });
        }
    
        return response.json(dev);
    }
};

