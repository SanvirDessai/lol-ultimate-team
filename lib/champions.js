import axios from 'axios'
import _ from 'lodash'
import { roles } from './roles'
import {
    CHAMP_DATA_URL,
    CHAMP_CARD_IMAGE_URL,
    CHAMP_DETAIL_IMAGE_URL,
    OFFICIAL_CHAMP_URL
} from './constants'

const normalise = (value, min, max) => {

    // These brute force validations because Viego
    if (value < min) { value = min }
    if (value > max) { value = max}

    return (value - min)/(max - min)
}

const formatImageName = (str) => {

    switch (str) {
        case "Cho'Gath": {
            return 'Chogath'
        }
        case "Kai'Sa": {
            return 'Kaisa'
        }
        case "Kha'Zix": {
            return 'Khazix'
        }
        case "LeBlanc": {
            return 'Leblanc'
        }
        case "Wukong": {
            return 'MonkeyKing'
        }
        case "Nunu & Willump": {
            return 'Nunu'
        }
        case "Renata Glasc": {
            return 'Renata'
        }
        case "Vel'Koz": {
            return 'Velkoz'
        }
        default: {
            const plainStr = str.replace(/[^\w\s]|_/g, '').replace(/\s+/g, '')
            return plainStr
        }
    }
    
}

export async function getChampionData() {
    const champData = await axios.get(CHAMP_DATA_URL)

    const champions = _.toArray(champData.data.data).map(champ => {

        return {
            name: champ.name,
            stats: champ.stats,
            title: champ.title,
            blurb: champ.blurb
        }
    })

    const statNames = Object.keys(champions[0].stats)

    const statVariance = {}

    statNames.forEach(stat => {
        const set = _.flatten(champions.map(champ => champ.stats[stat]))
        const min = _.min(set)
        const max = _.max(set)

        statVariance[stat] = {
            max,
            min
        }

        // Viego making things complicated
        if (stat === 'mp') {
            const setWithoutViego = set.filter(val => val !== 10000)
            const newMax = _.max(setWithoutViego)

            statVariance[stat] = {
                ...statVariance[stat],
                max: newMax
            }
        }
    })


    const normalisedChamps = champions.map(champ => {

        const normalisedStats = {}
        statNames.forEach(stat => {
            normalisedStats[stat] = normalise(champ.stats[stat], statVariance[stat].min, statVariance[stat].max) || 0
        })
    
        return {
            name: champ.name,
            stats: normalisedStats,
            title: champ.title,
            blurb: champ.blurb
        }
    
    })

    const roleNames = Object.keys(roles)

    const ratings = normalisedChamps.map(champ => {

        const ratings = {}
        let main = ''
        let mainRating = 0

        roleNames.forEach(role => {
            const coefficients = roles[role]

            let rating = 0

            statNames.forEach(stat => {
                rating = rating + coefficients[stat] * champ.stats[stat]
            })

            ratings[role] = Math.round(rating * 100, 10)

            if (mainRating < Math.round(rating * 100, 10)) {
                mainRating = Math.round(rating * 100, 10)
                main = role
            }
        })

        return {
            name: champ.name,
            image: `${CHAMP_CARD_IMAGE_URL}/${formatImageName(champ.name)}_0.jpg`,
            detailImage: `${CHAMP_DETAIL_IMAGE_URL}/${formatImageName(champ.name)}_0.jpg`,
            officialUrl: `${OFFICIAL_CHAMP_URL}/${formatImageName(champ.name).toLowerCase()}`,
            title: champ.title,
            blurb: champ.blurb,
            main,
            ratings
        }
    })

    return _.sortBy(ratings, (champ) => 100 - champ.ratings[champ.main])
}

