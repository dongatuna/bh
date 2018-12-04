module.exports = {
    /*
    this function takes in number of questions and the question array from Database
    not currently able to return 70 random questions
    */ 
    randomizeQuestions(num, questionArray){
              
        const questions = []
        const qIndexes = []         
        //cycle through the loop num times 
        for(let numOfQs = 0; numOfQs < num; numOfQs++){

            let randomQIndex = Math.floor(Math.random()*724)
            if(!qIndexes.includes(randomQIndex) && qIndexes.length!==(num-1)){                
                //const qIndex = (Math.floor(Math.random()*724))
                qIndexes.push(randomQIndex)                                           
            }           
        } 

        for(index of qIndexes){
            const question = questionArray[index]
            questions.unshift(question)   
        } 

        return questions
        
        // if(questions.length===(num-1)){
        //     return questions
        // }else{
        //     let extraQ = num-questions.length+1
        //     randomizeQuestions(extraQ, questionArray)
        //     return questions
        // }    
   }
}