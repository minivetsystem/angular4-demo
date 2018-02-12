import * as textmsg from './notify';
export class Message{
   static msgfor:number;
   public static print(){
      return textmsg.text[this.msgfor];
   }
   
}