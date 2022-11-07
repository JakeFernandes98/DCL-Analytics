// import { TriggerComponent, TriggerBoxShape } from "@dcl/ecs-scene-utils"
// import { ButtonStyles, CustomPrompt, PromptStyles } from "@dcl/ui-scene-utils"

export class Timer implements ISystem {
    timer: double

    constructor(){
        this.timer = 0
    }

    update(dt: number): void {
        this.timer = this.timer + dt
    }


}

export var gdpr: boolean = false

export class GDPRNotice {

    title: string = "GDPR Notice"
    notice: string = "Your may use your anonymous data to improve your experience here and in other experiences to tailor messages and to display ads to your interests"
    gdprNoticeLink: string = "https://www.unilevernotices.com/cookie-notices/united-kingdom-english.html"
    hasChosen: boolean = false

    constructor(parcelx: number, parcelz: number, debug: boolean = false, title?: string, notice?: string, gdprNoticeLink?: string){
        this.title = title
        this.notice = notice
        this.gdprNoticeLink = gdprNoticeLink

        const maxHeight = Math.round(Math.log(parcelx*parcelz)/Math.log(2))

        const entity = new Entity()
        entity.addComponent(new Transform({
            position: new Vector3((parcelx*16)/2, maxHeight/2 ,(parcelz*16)/2)
        }))

        // entity.addComponent(
        //     new TriggerComponent(
        //         new TriggerBoxShape(new Vector3(parcelx*16,maxHeight,parcelz*16), Vector3.Zero()),
        //         {
        //             onCameraEnter: () => {
        //                 if(!this.hasChosen){
                            // let prompt = new CustomPrompt(PromptStyles.DARK)
                            // prompt.addText(this.title, 0, 130, Color4.Red(), 30)
                            // prompt.addText(this.notice, 0, 100)
                            

                            // let checkBox = prompt.addCheckbox("Don't show again", -80, 50)

                            // let button1 = prompt.addButton(
                            // 'Accept',
                            // 0,
                            // -30,
                            // () => {
                            //     this.hasChosen = true
                            //     gdpr = true
                            //     log('Yes')
                            //     prompt.hide()
                            // },
                            // ButtonStyles.E
                            // )

                            // let button2 = prompt.addButton(
                            // 'Decline',
                            // 0,
                            // -90,
                            // () => {
                            //     this.hasChosen = true
                            //     log('No')
                            //     prompt.hide()
                            // },
                            // ButtonStyles.F
                            // )

                            // let button3 = prompt.addButton(
                            //     'Learn more',
                            //     0,
                            //     -150,
                            //     () => {
                            //         openExternalURL(this.gdprNoticeLink)
                            //     },
                            //     ButtonStyles.ROUNDWHITE
                            // )
        //                 }
        //             },
        //             enableDebug: debug
        //         }
        //     )
        // )

        engine.addEntity(entity)




    }
}