function findDuplicateTransactions(transactions) {
  let input_Transactions = transactions.slice();

 input_Transactions.sort(
   (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
 );

 let millisecondsInOneMinute = 60000;

 let result = input_Transactions.reduce((accTransactions, transaction) => {
   for (let i = 0; i < accTransactions.length; i++) {
     let accTransactionsTime = new Date(transaction.time).getTime();

     if (
       accTransactions[i].some(
         (purchase) =>
           transaction.sourceAccount === purchase.sourceAccount &&
           transaction.targetAccount === purchase.targetAccount &&
           transaction.amount === purchase.amount &&
           transaction.category === purchase.category &&
           accTransactionsTime / millisecondsInOneMinute -
             new Date(purchase.time).getTime() / millisecondsInOneMinute <
             1
       )
     ) {
       accTransactions[i].push(transaction);
       return accTransactions;
     }
   }
   accTransactions.push([transaction]);
   return accTransactions;
 }, []);

 result = result.filter((x) => x.length > 1);

 return result;
}
export default findDuplicateTransactions;