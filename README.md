# DCL Library Documentation

## Install

To use any of the helpers provided by this library:

1. Install it as an npm package. Run this command in your scene's project folder:

   ```
   npm install dcl-analytics-tracker
   ```

2. Add this to in the path array in the tsconfig.json file

   ```ts
   "@dcl/dcl-analytics-tracker": [
        "./node_modules/dcl-analytics-tracker/dist/index.d.ts"
      ],
   ```

## Usage

### Initialising the API

In order to send data to the Unilever APIs, you must initialise an API object with the appropriate URL

```ts
import {TrackableAPI} from 'dcl-analytics-tracker'

let api: TrackableAPI = new TrackableAPI('http://127.0.0.1:8080/add')
```

### Initialising metadata

We can define the data we want to set through a metadata object. This should be created in each floor/section of the experience as appropriate. Fetching user data is asynchronous and may take a while, the recommendation is that you pull player data as soon as the user enters the parcel, then re-use the playerInfo variable everytime you want to create a new Metadata set

```ts
import {BaseTrackableMetadata} from 'dcl-analytics-tracker'

let playerInfo
executeTask(async () => {
   playerInfo = await getUserData()
})
let isUserGuest = !(playerInfo.hasConnectedWeb3)

let metadata:BaseTrackableMetadata = {
  parcelId: "3",
  sectionId: "2",
  userId: isUserGuest ? playerInfo.userId : playerInfo.publicKey,
  userName: playerInfo.displayName,
  userGuest: isUserGuest
}
```

### Tracking Interaction with Entities

This allows you to track events every time a user clicks (interacts) with an entity in the experience. This is a replacement of the usual way of creating entities.

Standard way of creating an Entity:

```ts
const box = new Entity();
box.addComponent(new BoxShape())
box.addComponent(new Transform({
  position: new Vector3(8, 0, 12),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(2, 5, 2)
}))

box.addComponent(new OnPointerDown((e) => {
  log("clicked")
}))
```

Creating an entity which can be tracked:

```ts
import {TrackableEntity} from 'dcl-analytics-tracker'

const box = new TrackableEntity(metadata, "1");
box.addComponent(new BoxShape())
box.addComponent(new Transform({
  position: new Vector3(8, 0, 12),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(2, 5, 2)
}))

box.addComponent(new OnPointerDown((e) => {
  log("clicked")
  box.triggerEvent(api)
}))
```

### Tracking Views and View Time on Entities

This allows you to track how long users spend looking at an entity. This could be useful for personalisation and advert billboards in the scene.

```ts
let trackingCamera = new TrackableCamera(api)
let billboard = new Entity()
//... setting up the buildboard's image and position

trackingCamera.addEntity(billboard, metadata, "name for the entity/ad")
```


### Using Adobe Target

Currently Adobe Target can be used to served image URLs and text. This requires defining a set of segments and the matching url/text responses. Here is an example where we pull data based on how long the user has looked at different adverts and serve another advert based on it.

```ts
executeTask(async () => {
   //fetching advert data
   let userId = metadata.userId
   let response = await fetch("http://127.0.0.1:8080/get/"+userId)
   let json = await response.json()
   
   //base segment
   let segment = "icecream"

   //comparing how long the user has looked at a Ben & Jerry's advert vs a Skincare advert
   if(await json["B&J"] > await json["Skin"]){
      segment = "icecream"
   }else{
      segment = "skincare"
   }
   
   //triggering an adobe target offer using that segment
   let res = await adobeTarget.trigger_offer(segment)
   
   //pulling the image URL from the adobe Target response (see Adobe Target API documentation for more information)
   let imageUri = res["execute"]["mboxes"][0]["options"][0]["content"]

   //setting the image for a billboard
   QRMaterial3.albedoTexture = new Texture(imageUri)
   QRPlane3.addComponentOrReplace(QRMaterial3)
})
```
...

## Copyright info

This scene is protected with a standard Apache 2 licence. See the terms and conditions in the [LICENSE](/LICENSE) file.
