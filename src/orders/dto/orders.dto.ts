import { Type } from "class-transformer";
import { IsArray, IsInt, IsString, ValidateNested } from "class-validator";


class OrderItemsDto{
    @IsString()
    productId : string

    @IsInt()
    quantity:number
}
export class OrderDto{
    @IsString()
    userId:string
    
    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>OrderItemsDto)
    items:OrderItemsDto[]
}