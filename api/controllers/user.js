import { db } from "../database.js";


export const getUsers = (_, response) => {
    const qry = "SELECT * FROM usuarios";

    db.query(qry, (err, data) => {

        if (err) return response.json(err); // Caso ocorra algum erro, retorna um JSON com o erro.

        return response.status(200).json(data); // Caso não ocorra retorna um json com status code 200 = Ok e um JSON com os dados
    });
};

export const addUser = (required, response) => {

    const qry = "INSERT INTO `usuarios` (`nome`, `email`, `fone`, `data_nascimento`) VALUES (?)";

    const values = [
        required.body.nome,
        required.body.email,
        required.body.fone,
        required.body.data_nascimento,
    ];

    db.query(qry, [values], (err) => {
        if (err) return response.json(err);

        return response.status(200).json("Usuário criado com sucesso!");
    })
};


export const updateUser = (required, response) => {

    const qry = "UPDATE `usuarios` SET `nome` = ?, `email` = ?, `fone` = ? , `data_nascimento` = ? WHERE `id` = ? ";


    const values = [
        required.body.nome,
        required.body.email,
        required.body.fone,
        required.body.data_nascimento,
    ];

    db.query(qry, [...values, required.params.id], (err) => {
        if (err) return response.json(err);

        return response.status(200).json("Usuário Atualizado com Sucesso!!!")

    });
};

export const deleteUser = (required, response) => {

    const qry = "DELETE FROM USUARIOS WHERE `id` = ?";

    db.query(qry, [required.params.id], (err) => {
        if (err) return response.json(err);

        return response.status(200).json("Usuario Deletado com Sucesso!!!");
    })
} 