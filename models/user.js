module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
            validate: {
                isEmail: true
            },
            msg: "Email must be valid"
        },
        gender: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['f', 'm'],
            validate: {
                isIn: [['f', 'm']]
            },
            msg: "Gender is only Male or Female"
        },
        verification: {
            type: DataTypes.ENUM,
            allowNull: false,
            values: ['pending','verified'],
            defaultValue: 'pending',
            validate: {
                isIn: [['pending', 'verified']]
            }
        },
        primary_email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: true,
            validate: {
                isEmail: true
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_number: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        profile_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        provider: {
            type: DataTypes.ENUM,
            values: ['local', 'google', 'facebook'],
            allowNull: false
        },
        encrypted_password: DataTypes.STRING,
        reset_password_sent_at: {
            type: DataTypes.DATE
        },
        sign_in_count: DataTypes.INTEGER(11),
        date_registered: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW
        },
        current_sign_in_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW
        },
        last_sign_in_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW
        },
        current_sign_in_ip: DataTypes.INTEGER(10),
        last_sign_in_ip: {
            type: DataTypes.INTEGER(10),
            validate: {
                isIp: true
            }
        }
    });
    return User;
}
