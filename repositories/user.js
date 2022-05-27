const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const scrypt = util.promisify(crypto.scrypt);

const Repository = require('./repository');

class UsersRepository extends Repository {
    async create(attrs){
        //attrs === {email: '', password: ''}
        attrs.id = this.randomId();

        const salt = crypto.randomBytes(8).toString('hex');
        const hashed = await scrypt(attrs.password, salt, 64);

        const records = await this.getAll();
        const record = {
            ...attrs, 
            password: `${hashed.toString('hex')}.${salt}`
        };
        records.push(record);
        await this.writeAll(records);
        return attrs;
    }

    async comparePassword(saved, supplied) {
        const [hashed, salt] = saved.split('.');
        const hashedSupplied = await scrypt(supplied, salt, 64);
        return hashed === hashedSupplied.toString('hex');
    }
}

module.exports = new UsersRepository('users.json');