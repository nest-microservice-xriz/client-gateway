import { IsEnum, IsUUID } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enum/order.enum";

export class ChangeStatusDto{
    
    @IsUUID()
    id: string;

    @IsEnum(OrderStatusList,{message:`Valid status are ${OrderStatusList}`})
    status: OrderStatus
}