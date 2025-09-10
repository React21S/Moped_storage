'use strict';

const adapt = (item)=>{
    return {
        mopedId: Number(item.mopedId) ,
        name: item.name,
        rating: item.rating,
        topspeed: Number(item.topspeed),
        modelYear: (item.modelYear )
    }
}

module.exports = {adapt};