export interface MessageReceiver<Message, Data> {
    receive(msg: Message, data: Data): void;
}

export function pingAll<Message, Data, TRec extends MessageReceiver<Message, Data>>(receivers: TRec[], msg: Message, datas: Data[], predicate: (rec: TRec, data: Data) => boolean) {
    for(const rec of receivers) {
        for(const data of datas) {
            if(predicate(rec, data)) {
                rec.receive(msg, data);
            }
        }
    }
}