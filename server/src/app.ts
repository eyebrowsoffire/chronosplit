import { ServerSession } from "./ServerSession";

const sampleTemplate = {
    "gameInfo": {
        "name": "Super Derp Bros. 3"
    },
    "category": {
        "name": "Any% Derpless"
    },
    "splits": [
        {
            "info": {
                "name": "World 1",
                "iconUrl": "https://images.com/world1.png"
            }
        },
        {
            "info": {
                "name": "World 2",
                "iconUrl": "https://images.com/world2.png"
            }
        },
        {
            "info": {
                "name": "World 3",
                "iconUrl": "https://images.com/world3.png"
            }
        }
    ]
};

const session = new ServerSession(8080, sampleTemplate);
session.listen();
