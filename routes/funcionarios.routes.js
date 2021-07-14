const router = require("express").Router();

const { Funcionarios } = require("../models");


const uploadCloud = require("../config/cloudinary.config");

// Image upload to Cloudinary
// 'image' field must have the same name as the name of the requested BODY

router.post(
  "/image-upload", uploadCloud.single("image"),
  (req, res) => {
    console.log(req);
    if (!req.file) {
      return res.status(500).json({ msg: "No file uploaded" });
    }
    return res.status(201).json({ fileUrl: req.file.path });
  }
);

//CREATE FUNCIONARIO
router.post("/funcionario", async (req, res) => {
  console.log(req.body);
  const { 
    nome,
    email,
    data_nascimento,
    data_admissao,
    setor,
    cargo,
    nivel,
    image_url } = req.body;
  
  try {
    
    const funcionario = await Funcionarios.create({ 
        nome,
        email,
        data_nascimento,
        data_admissao,
        setor,
        cargo,
        nivel,
        image_url 
    });

    console.table(funcionario);
    return res.json(funcionario);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//READ FUNCIONARIOS
router.get("/funcionarios", async (req, res) => {
  try {
    const funcionarios = await Funcionarios.findAll();

    return res.json(funcionarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//FIND ONE PILOT
router.get("/funcionario/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const funcionario = await Funcionarios.findOne({ where: { id } });

    return res.json(funcionario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

//UPDATE ONE FUNCIONARIO
router.put("/funcionario/:id", async (req, res) => {
  const { id } = req.params;
  const {  
    nome,
    email,
    data_nascimento,
    data_admissao,
    setor,
    cargo,
    nivel } = req.body;

  try {
    const funcionario = await Funcionarios.findOne({ where: { id } });
    
    funcionario.nome = nome,
    funcionario.email = email,
    funcionario.data_nascimento = data_nascimento,
    funcionario.data_admissao = data_admissao,
    funcionario.setor = setor,
    funcionario.cargo = cargo,
    funcionario.nivel = nivel

    await funcionario.save();

    console.table(funcionario);
    return res.json(funcionario);
  } catch (err) {
    console.log(err);
    return res.status(500).json("Something went wrong!");
  }
});

//DELETE ONE FUNCIONARIO
router.delete("/funcionario/:id", async (req, res) => {
  const { id } = req.params;
  const funcionario = await Funcionarios.findOne({ where: { id } })

  try {
    await Funcionarios.destroy({ where: { id } });

    if(funcionario){
        return res.json({ message: `Pilot ${funcionario.nome} deleted!` })
    }else {
        return res.json({ message: `Pilot not found!` })
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

module.exports = router;