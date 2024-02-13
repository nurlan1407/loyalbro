import { Float } from "react-native/Libraries/Types/CodegenTypes";
import img from "~/assets/images/establishments/es_1.jpeg";
import img2 from '~/assets/images/establishments/es_2.jpeg';
import img3 from '~/assets/images/establishments/es_3.jpeg';
import img4 from '~/assets/images/establishments/es_4.jpeg';
import img5 from '~/assets/images/establishments/es_5.jpeg';
import img6 from '~/assets/images/establishments/es_6.jpeg';
import img7 from '~/assets/images/establishments/es_7.jpeg';
import img8 from '~/assets/images/establishments/es_8.jpeg';



export interface Establishment {
    id: number,
    title: string,
    type: string,
    description: string,
    mainImg: string,
    imgs: string[],
    rating: Float,
    location: {
        latitude: number,
        longitude: number
    }
}


export const EstablishmentDemo: Array<Establishment> = [
    {
        id: 1,
        title: "Establishment One",
        type: "Cafe",
        description: "Description for Establishment One lorem lo loremloremloremloremlorem",
        mainImg: img,
        imgs: [img, img2, img3, img4, img5, img6, img7],
        rating: 4.5,
        location: {
            latitude: 51.0851174,
            longitude: 71.3088212,
        }
    },
    {
        id: 2,
        title: "Establishment Two",
        type: "Cafe",
        description: "Description for Establishment Two",
        mainImg: img2,
        imgs: [img, img5, img7],
        rating: 4.7,
        location: {
            latitude: 51.0451174,
            longitude: 71.2088212,
        }
    },
    {
        id: 3,
        title: "Establishment Tree",
        type: "Cafe",
        description: "Description for Establishment Two",
        mainImg: img3,
        imgs: [img4, img8, img3],
        rating: 4.7,
        location: {
            latitude: 51.0951174,
            longitude: 71.5088212,
        }
    },
    // {
    //     title: "Establishment Four",
    //     type: "Cafe",
    //     description: "Description for Establishment Two",
    //     mainImg: img2,
    //     imgs: [img,img2],
    //     rating: 4.7,
    // },
]