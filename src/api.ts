import { FullTrackableMetadata } from "./metadata"

export class TrackableAPI {

    url: string

    constructor(url:string){
        this.url = url
    }

    req(metadata: FullTrackableMetadata){
        executeTask(async () => {
            let json
            try{
                let body = metadata
                let response = await fetch(this.url, {
                    headers: { "Content-Type": "application/json" },
                    method: "POST",
                    body: JSON.stringify(body),
                  })
                  json = await response.json()
                  log(json)
            } catch {
                  log("failed to reach URL")
            }
            
            return JSON.stringify(json)
        })
    }
}