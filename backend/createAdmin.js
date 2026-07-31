const bcrypt = require("bcrypt");
const db = require("./database");

const username = "codexstartup";
const password = "BL4Z3@Ishaan";

bcrypt.hash(password, 10, (err, hash) => {

    if (err) {
        console.log(err);
        return;
    }

    db.run(

        `INSERT INTO admins(username,password)
         VALUES(?,?)`,

        [username, hash],

        function(err){

            if(err){
                console.log(err.message);
                return;
            }

            console.log("✅ Admin Created Successfully");

            process.exit();

        }

    );

});