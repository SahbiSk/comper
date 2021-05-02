modeule.exports=function Cart(oldCart)
{
    this.items=oldCart.items || {}
    this.totalProd=oldCart.TotalProd ||0
    this.totalPrice=oldCart.totalPrice || 0

    this.addToBasket(prod,id)
    {
         let stroedItem=this.items[id]
         if(!stroedItem)
         {
            stroedItem= this.items[id]= {item: prod , qty:0, price:0}
         }

         stroedItem.qty++
         stroedItem.price= prod.price*stroedItem.qty
         this.totalProd++
         this.totalPrice+=prod.price
    }

    this.deleteFromBasket(id)
    { 
        
        if(this.items[id])
        {

        if(this.items[id].qty>0)
        {
            this.items[id].qty--
            this.items[id].price-=this.items[id].item.price
            this.totalProd--
            this.totalPrice-=this.items[id].item.price
        }
        else
        {
        delete this.items[id]
        }

        return true 

      }
        return false 

    }
}