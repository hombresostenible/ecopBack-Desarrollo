import express, { Request, Response } from "express";
import { handleDeviceData } from "../../services/POS/device.service";
import { authRequired } from "../../middlewares/Token/Token.middleware";
import { USBAuthRequired } from "../../middlewares/Token/USB.middleware";

const router = express.Router();

// Ruta para recibir datos del dispositivo vía HTTP
router.post("/", authRequired, async (req: Request, res: Response) => {
  try {
    const { userId } = req.user;
    const data = req.body;

    if (!data) {
      return res.status(400).json({ message: "Los datos son requeridos" });
    }

    // Procesamos los datos del dispositivo
    handleDeviceData(userId, data);
    res.status(200).json({ message: "Datos recibidos correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al procesar los datos del dispositivo" });
  }
});
//http://localhost:3000/api/device?userId="921309c7-692b-4c3d-8273-85f2694a91b1" POST


// Ruta para recibir datos del dispositivo vía USB
router.post("/usb", USBAuthRequired, (req: Request, res: Response) => {
  try {
    const { userId } = req.user;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "UserId no disponible en la sesión" });
    }

    const { data } = req.body;
    handleDeviceData(userId, data);
    res.status(200).json({ message: "Datos recibidos correctamente" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al procesar los datos del dispositivo" });
  }
});



// Ruta para enviar datos del dispositivo vía usb (no implementada)

export default router;
