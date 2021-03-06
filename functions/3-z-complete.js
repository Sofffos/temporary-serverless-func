require('dotenv').config()
const Airtable = require('airtable-node');
 
const airtable = new Airtable({ apiKey:  process.env.AIRTABLE_API_KEY})
  .base('appVfo6Ps9kALnL0t')
  .table('Products')

exports.handler = async(event,context,cb)=>{
    const{id} = event.queryStringParameters;
    console.log(id);
    if(id){
        try {
            const product = await airtable.retrieve(id);
            //const product = await airtable.list();
            console.log(product);
            if(product.error){
                return{
                    statusCode:400,
                    body: 'Ndo product with id',
                }
            }
            return{
                statusCode:200,
                body: JSON.stringify(product),
            }
        } catch (error) {
            return{
                statusCode:400,
                body: 'no product with id',
            }
        }
        
    }
    try {
        const {records} = await airtable.list();
        const products = records.map((product)=>{
            const {id} = product;
            const {name,image,price} = product.fields;
            const url = image[0].url;
            return {id,name,url,price}
        })
        return{
            statusCode:200,
            body: JSON.stringify(products),
        }
    } catch (error) {
        return{
            statusCode:500,
            body: 'Server error',
        }
    }
    
}