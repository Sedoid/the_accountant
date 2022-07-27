

let message_text = [
`Your payment of 200 FCFA for MTNC Bundles has been completed at 2021-12-20 01:25:42. Your new balance: 18262 FCFA. Fee was 0 FCFA . Transaction Id: 3365863729. Make a transfer or a withdrawal of at least 5000F and try to win a PIECE of LAND each day.`,

"Hello, a transaction of FCFA 300 from your Mobile Money account by MTNC BUNDLES_FORFAITS   (MTN_Bundles) has been successfully completed on2021-12-19 22:01:12.New balance:18462 FCFA. Transaction ID: 3365620912.External Transaction ID: 3370426089836544789.",

"Yello. Dial *126# to authorise payment of FCFA 300 from MTNC BUNDLES_FORFAITS. Approval ID: 425057318.",

"Successful purchase of FCFA 500 airtime via Mobile Money. Transaction ID: 3365406087 , You were rewarded: FCFA  500 bonus airtime. Check Bonus: *159*123#. New account balance: FCFA 18,762.",

"Your payment of 500 FCFA for MTNC AIRTIME has been completed at 2021-12-19 20:48:34. Your new balance: 18762 FCFA. Fee was 0 FCFA . Transaction Id: 3365406087. Make a transfer or a withdrawal of at least 5000F and try to win a PIECE of LAND each day.",

"You have successfully withdrawn FCFA 5000 from your mobile money account, from LADO KENNE FABRICE MATRIX SARL (237683689413) on 2021-12-19 19:21:01. Fees: FCFA 150; Transaction Id: 3365019253. New balance: FCFA 19262. For every MoMo withdrawal of at least 5000F, try to win a PIECE of LAND every day.",

"You just received FCFA 3100 from NYUYSEMO NSAI PASCAL (237683082330) at 2021-12-19 13:22:51. Transaction ID: 3363422078. Reference: Karl New account balance: FCFA 24412. Send a MoMo of at least 5000F and try to win a piece of LAND each day.",

"Successful transfer of FCFA 10000, to ARIOLE DACEIN ZAFACK ZEUKANG (237679724561), Fees: FCFA 0 at 2021-12-18 09:03:39; Transaction ID: 3357944871; Reference: purchase merch; New account balance: FCFA 21312. Send a MoMo of at least 5000F and try to win a piece of LAND each day",

"Hello, a transaction of FCFA 150 from your Mobile Money account by MTNC BUNDLES_FORFAITS   (MTN_Bundles) has been successfully completed on2021-12-16 19:05:47.New balance:31312 FCFA. Transaction ID: 3351800918.External Transaction ID: 839145754304338100.",

"Your payment of 200 FCFA for MTNC Bundles has been completed at 2021-12-13 00:13:42. Your new balance: 45221 FCFA. Fee was 0 FCFA . Transaction Id: 3335366194. Make a transfer or a withdrawal of at least 5000F and try to win a PIECE of LAND each day.",

"Yello. Dial *126# to authorise payment of FCFA 2099 from MTNC BUNDLES_FORFAITS. Approval ID: 412542450.",

"Your payment of 35000 FCFA for Ecobank Push and Pull has been completed at 2021-12-21 03:13:45. Your new balance: 17462 FCFA. Fee was 700 FCFA . Transaction Id: 3370514587. Make a transfer or a withdrawal of at least 5000F and try to win a PIECE of LAND each day.",

"Your payment of 8000 FCFA for Transfer To non MoMo Account has been completed at 2021-12-21 15:05:06. Your new balance: 7923 FCFA. Fee was 190 FCFA . Transaction Id: 3373043771. Make a transfer or a withdrawal of at least 5000F and try to win a PIECE of LAND each day.",

"You KARLSON FONYUY DZEKEWONG (237654451039) have via agent: LADO KENNE FABRICE MATRIX SARL (237683689413 -), withdrawn 5000 XAF from your mobile money account: 58782315 at 2022-06-01 19:18:00 and you can now collect your money in cash. Your new balance: 131318 XAF. Fee paid: 100 XAF. Message from agent: -. Financial Transaction Id: 4145073190.",

"Hello, the transaction with amount 1775 XAF for SEVEN ACADEMY PAYMENT (237676963697) with message: SevenOnlinePayments failed at 2022-06-14 14:53:00, reason: Expired .Please check your balance or contact system admin for the cause. Financial Transaction Id: 4214016353. External Transaction Id: transactionId1655214284.",

"You have transferred 26000 XAF to ADELAIDE ROSY NJAMI (237650334660) from your mobile money account 58782315 at 2022-06-01 21:25:53. Your new balance: 44016 XAF. Message from sender: Rent. Message to receiver: Rent. Financial Transaction Id: 4145806040."

]
/*information to obtain*/
// Date
// sender_name
// receiver_name
// amount_exchanged
// Balance
// mtn_charge 
// transaction_status
// reason_for_transfer


for(let x=0; x<message_text.length; x++){
    dataExtraction(message_text[x])
}


function dataExtraction(message_text){
    // split the messages into sentences
    let message_details = message_text.split('.')
    let message_data = {}
    let transaction_status = false;
    let amount_exchanged = 0
    let charge_fee = 0
    let sender_name
    let transaction_id
    let balance
    let sender_reason = undefined
    if(message_details.length <=2)
        message_details = message_text.split(';')    

    // From the first sentence, determine if at all the message is a transaction and if so...determine if it was successfull txn or a failure
    let valid_transac_test = /complete|received|successful|transfer|withdraw/gi
    let money_gained_test = /received/gi
    let withdrawal_test = /withdraw/gi
    let transfer_test = /transfer/gi
    let transfer_status = false
    let airtime_test = /airtime/gi
    let ecobank_test = /ecobank/gi
    let find_amount = /^[^\d]*(\d+)/
    let find_sender = /from(.*)at/i
    let find_sender_reason = /reference:(.*)new/i
    let find_balance = /balance(.*)/i
    let find_fee = /fee(.*)/i
    let index = 0
    
    
    if(valid_transac_test.test(message_details[0])){
        // console.log("----------- Valide Transaction --------------")
        // console.log(message_text)
        // Determine if the message is indicating gaining of income
        transaction_status = money_gained_test.test(message_details[0])
        message_data.transaction_status = transaction_status

        let result = find_amount.exec(message_details[0])
        amount_exchanged = +result[1]
        message_data.amount_exchanged = amount_exchanged

        if(transaction_status){
            sender_name = find_sender.exec(message_details[0])[1]
            message_data.sender_name = sender_name
        }else{
            let find_transfer_name = /to(.*),/i
            let find_transfer_name1 = /to(.*)has/i
            let find_transfer_name2 = /for(.*)has/i
            let find_transfer_name3 = /\((.*)\)/i
                        
            if(withdrawal_test.test(message_details[0]))
                message_data.transac_reason = "Withdrawal"

            else if(airtime_test.test(message_details[0]))
                message_data.transac_reason = "Airtime"
            
            else if(ecobank_test.test(message_details[0]))
                message_data.transac_reason = "Ecobank"
            
           else if(transfer_test.test(message_details[0])){
                message_data.transac_reason = "Transfer"

                if(find_transfer_name.test(message_details[0]))
                    message_data.sender_name = find_transfer_name.exec(message_details[0])[1]
                else if(find_transfer_name1.test(message_details[0]))
                    message_data.sender_name = find_transfer_name1.exec(message_details[0])[1]


            }  
            else if(find_transfer_name3.test(message_details[0])){
                // console.log('--- here ---')
                message_data.sender_name = find_transfer_name3.exec(message_details[0])[1]
                // console.log(find_transfer_name3.exec(message_details[0]))
            }                          
            else if(find_transfer_name2.test(message_details[0])){
                message_data.sender_name = find_transfer_name2.exec(message_details[0])[1]
                // console.log('*** here ***')
                // console.log(find_transfer_name2.exec(message_details[0]))
            }
            else{
                console.log('-------------------')
                console.log(message_details[0])
            }
                
                
        }
            for(index = 1; index < message_details.length; index++){

                let transaction_test = /id:(.*)/i
                sender_reason = find_sender_reason.exec(message_details[index])

                if(transaction_test.test(message_details[index])){

                    let trans_id = find_amount.exec(message_details[index])

                    if(+message_details[index].split(':').pop())
                        trans_id = message_details[index].split(':').pop()
                    else
                        trans_id = +trans_id[1]

                    message_data.transaction_id = +trans_id        
                }

                if(sender_reason){
                    sender_reason = sender_reason[1]
                    message_data.transac_reason = sender_reason
                }


                if(find_balance.test(message_details[index])){

                    let remove_special_chars = message_details[index].replace(/[^\w\s]/gi,'')
                    let result = find_balance.exec(remove_special_chars)
                    result = result[1]
                    balance = find_amount.exec(result)[1]
                    message_data.balance = +balance
                }

                if(find_fee.test(message_details[index])){
                    charge_fee = find_amount.exec(message_details[index])
                    charge_fee = +charge_fee[1]
                    message_data.charge_fee = charge_fee
                }

            }
            console.log(message_text)
            console.log(message_data)
    }else{
        // console.log('------------ Invalid Transaction -------------')
        // console.log(message_text+"\n\n")
    }

}