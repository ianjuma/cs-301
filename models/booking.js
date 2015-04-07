module.exports = function(sequelize, DataTypes) {
    var Booking = sequelize.define("Booking", {
        license_plate: {
            type: DataTypes.STRING(12),
            primaryKey: true
        },
        booking_date: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        car_owner: {
            type: DataTypes.STRING,
            allowNull: false
        },
        days_of_booking: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        underscored: true,
        classMethods: {
            underscored: true,
            associate: function(models) {
            }
        }
    });

    return Booking;
};
