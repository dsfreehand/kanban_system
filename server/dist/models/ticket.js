import { DataTypes, Model } from 'sequelize';
export class Ticket extends Model {
    id;
    name;
    status;
    description;
    assignedUserId;
    // associated User model
    assignedUser;
    createdAt;
    updatedAt;
}
export function TicketFactory(sequelize) {
    Ticket.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        assignedUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        tableName: 'tickets',
        sequelize,
    });
    return Ticket;
}
//# sourceMappingURL=ticket.js.map