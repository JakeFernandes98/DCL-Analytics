export class AdobeTarget {
    client: string
    sessionId: string
    publicKey: string


    constructor(publicKey: string, client: string, sessionId: string){
        this.publicKey = publicKey
        this.client = client
        this.sessionId = sessionId
    }

    async trigger_offer(segment: string){
        let url = 'https://unileverapac.tt.omtrdc.net/rest/v1/delivery?client='+this.client+'&sessionId='+this.sessionId

        let body: DeliveryBody = {
            // id: {
            //     marketingCloudVisitorId: this.publicKey
            // },
            context: {
                channel: 'web'
            },
            property: {
                token: "5372887c-6d22-52c0-0b5c-43d2643d2afb"
            },
            execute: {
                mboxes : [
                    {
                        "name": "api_charter1",
                        "index": 1,
                        "parameters":{"id":segment}
        
                   }
                ]
            }

        }

    
        let response = await fetch(url,{
            method: 'POST',
            headers: {

            },
            body : JSON.stringify(body)
        })
        log(await response.status)
        let result = await response.json()
        return result

    }



}
 
interface DeliveryBody {
    requestId?: string
    impressionId?: string
    id?: {
        tntId?: string
        thirdPartyId?: string
        marketingCloudVisitorId?: string
    }
    environmentId?: number
    property?: {
        token?: string
    }
    trace?: {
        authorisationToken?: string
        usage?: Object
    }
    context?: {
        channel?: string
        application?: {
            id?: string
            name?: string
            version?: string
        }
    }
    execute?: {
        pageLoad?: {

        }
        mboxes ?: [
            {
                index?: number
                address?: {
                    url?: string
                }
                product?: {
                    id?: string
                    categoryId?: string
                }
                name?: string
                parameters? : {
                }

            }
        ]
    }
        

}

export enum Segments {
    ICE_CREAM,
    SKINCARE,
    HOMECARE,
    NUTRITION, 
}