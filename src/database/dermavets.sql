-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 12-11-2024 a las 23:25:49
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `dermavets`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `id_admin` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `correo_electronico` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `id_cita` int NOT NULL,
  `id_cliente` int NOT NULL,
  `id_mascota` int NOT NULL,
  `id_servicio` int NOT NULL,
  `fecha_cita` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id_cliente` int NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `correo_electronico` varchar(255) NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id_cliente`, `usuario`, `correo_electronico`, `password`) VALUES
(20, 'suarez', 'suarezdiego4567@gmail.com', '$2b$10$Jyyo7SdWZwtGsPqH80G8sOdb7bjItssCtUGkXQMTrIQWnRJw/ykky'),
(21, 'test3344', 'test3344@test.com', '$2b$10$5K.1xXpkg5sZGKKdiy4Dx.29vI2X0WSrF6./agooOH3PCNlw2Zghu'),
(22, 'Apple iMac', 'test1234@test.com', '$2b$10$v4wFxkxCEbxFak7YtohRPOXu7bgogpXEvQ07fDgi0lJcbEYMnL7US'),
(23, 'keran', 'karen@test.com', '$2b$10$hQttcfcbYFrnKR0hjDTbMexvYMqNY39vjJrgOoN8qQArAisOF7k6i'),
(24, 'suarezqqqqq', 'diego@test.com', '$2b$10$UdO3EMmZev1TUsD/sDtRSukvqLoVqcs.Nb/cTMehh9Mbk9XQsjHre'),
(25, 'keran1', 'karen1@test.com', '$2b$10$Fq1v4OBC4.rstWAYMqeeTe36P58jYGNlsylqwSgRBfQUYs/YGgBpe'),
(26, 'krwer2', 'karen21@test.com', '$2b$10$SUkxXxJq.m8ndhOBHX85sutthk0x53pSJBe1TKpOR6YLowl.vjc9y'),
(27, 'krwer22', 'karen221@test.com', '$2b$10$MJvZRc8Qe5TeECLyUNtXDOKRjK8/ntl0KKTZNtyiSmPkGa4xuryv6'),
(28, 'krwer223', 'karen2213@test.com', '$2b$10$GUFUOV8WrKlnARXGv3E28./kyuQlgawaUtmGZNScG2BjXKDSbqYji'),
(29, 'krwer5223', 'karen22513@test.com', '$2b$10$MoMsfSfqBVKlaQEJPKls7O9P5DAnm/iX0f95fOFHc4nSkEqVI6d5e'),
(30, 'krwer52523', 'karen225513@test.com', '$2b$10$6CMrQywICqyIDH0R7ziy4uGsDylxFdQ9aw8bnJB4aKytozJ2Qrc/K'),
(31, 'kr3333wer52523', 'kare333n225513@test.com', '$2b$10$s0mFVCRHCQ5myBUoPmUL0.SxLOteYw0JtJ3.i5mPGLyEdBGBC7aa.'),
(32, 'kr53333wer52523', 'kare3533n225513@test.com', '$2b$10$mugp.ibRqSYGOpTT43T/7O.1Fr5qEh9uypGxMSe/FHeqwAUXnpmUi'),
(33, 'suarezeeeeeeeeeeeeeeee', 'test123@test.com', '$2b$10$0qNI1o4hnfETB4OX2PrAcOOcj.z8Y.xIRa4ceEZWUv52cqySjid86'),
(34, 'suarezffff', 'suarezdiego4555567@gmail.com', '$2b$10$iUpkCfSFWflRCEfc4wDN1.3PKuumWs26mtaO7FEW/l326ODooHIXK'),
(35, 'suarezffffu', 'suarezdiego45555867@gmail.com', '$2b$10$hk/xnCZ.K07d7LZej/OqFudzSWayQPDPdbOXeqt6/wvTpsUvU/MpC'),
(36, 'suarezffffuu', 'suarezdiego455655867@gmail.com', '$2b$10$rwz092GDAn228wxtRhsLXefh57men7PP.LzWZ/0Q.XlvBW9Sm/JK.'),
(37, 'suarezfsdfdsfsd', 'jemiryk@mailinator.com', '$2b$10$gROwEdh.dPhmAvtBKD2QYOPtuc71F1uomowHEqHoScj1pqa/yqk36'),
(38, 'wrfsdsfdsfffwefwsdf', 'test126663@test.com', '$2b$10$OVjEbHjbdFXVBsjvvCxYr.x/9DQA7QJPo83Ui8AlLqGMLTW0EKyCu'),
(39, 'suarezsdfdsfdsf', '32423test@test.com', '$2b$10$Q8AakENxz8SXzsxnr/gDzufppKoxUCJ850P33xGOKJ.QxA9KUmQwO'),
(40, 'llll', 'yjfjfj@jdjfjf.vo', '$2b$10$ZeF6r6r81xzPD2vr6EAHUesT/zHTgNDFvkfplHtHwOF6pgly/Eplu'),
(41, 'Iola Schroeder', 'myvija@mailinator.com', '$2b$10$BmY0TyqKIofFztMIke0mNu9wsbLDNBoFp5Ms.3VRFvKBO81/wuWty'),
(42, 'Echo Riley', 'hocydut@mailinator.com', '$2b$10$DDYry1n.hlBSeo92v9HJpOPKzRxNSSoEr6pgffA9rGEv/jan0cnT2'),
(43, 'dsfdsf', 'diego123@test.com', '$2b$10$TW4uPjdx1WoGI1psyg0shO8K/Ud1i6oHLe2k7dLpYrL5Cn157.ULm'),
(44, 'suarezfdsfrew', 'test3123@test.com', '$2b$10$27k5sXtHUZ6QVzxY4o/qb.mXBTGIzgXDRTLAe7vLxyBrAd3H7iCUe'),
(45, 'Whilemina Carson', 'walinune@mailinator.com', '$2b$10$d8hPWPeAYLkY0AMAMZ1dAuXERTIR9w5/erZYt0da8wfoBB.bLORgS'),
(46, 'Whilemina Carson g', 'walinune111@mailinator.com', '$2b$10$zU/Bpuo7F1KDmUdA8TP/AOgROBCI.pnIAzXTdelUnJ3QdiYz3TLNS'),
(47, 'dfghjklxcvbnmdfghjkl', 'diego234567@test.com', '$2b$10$EeYfdHHnkeLAF5GLnbkLIeEiI4N2Hs0dB6RnxWgA80nZO8LiAeLm.'),
(48, 'fdssdfdssssssssssssssssssssssssssssssssssss', 'diegos615483456730@gmail.com', '$2b$10$y89CuDVbfd2A.dXYwJaBxeTaVoDGLRQ6ZlbrXI3Cg4p5XeaZsMxZy'),
(49, 'fdssdfdssssssssssrrrssssssssssssssssssssssssss', 'diegos61548345rr6730@gmail.com', '$2b$10$ENkuVlbVJ/ZQlfuhG/eZn.lbBUIkgcCvAJMNcjqekwQ5AjQg.fkYe'),
(50, 'sdfghjkl fghjkl', 'suarezdiego45345678967@gmail.com', '$2b$10$spmON4Nt.OhrbdgaSF1HseNyDuBAIqvflJB0HogCQMp47klw2gEuO'),
(51, 'xdfghjkl', 'diegos61cghjk54830@gmail.com', '$2b$10$ZFyQxV.X.sqGN7xAHfw/sOYvrgOhA73Kz8WSE2C30FTmmnaQDY1R2'),
(52, 'fghjk', 'test12334567@test.com', '$2b$10$VLeCWKQoicJMad5spCcLtefbrHEr.BARNl8H07xFct9KXu9h6etzu'),
(53, 'sdfghjkkokokokokoko', 'test@test.com', '$2b$10$oWT34MMiZgp4cpZmBJy.uu1ERxv3fmmg3zoWpUaP1z5KDRZzB3brO'),
(54, 'jfdssdfsdadsfdsfdsffdsf', 'test1232222222222222222222222@test.com', '$2b$10$v/5SA0Xk63fLcylG5caL2ewZ3srYSWZ4NQYk/PTkmAlEXvrBeWKuK'),
(55, 'sdafgdfh dsgah', 'test12erdgh3@test.com', '$2b$10$7r0YbcqC59oV8xeJjxaNvuLoefanheuY0nozWzv977FLNJKbU9kVu'),
(56, 'fgfhj f gds da df d fds fd', 'dfs23564789087654324@dsk.vv', '$2b$10$sUN/H6qk6xnb/J1TOMY93uNvyI9xf2MK.rRfVcyY1iK910T2J6fTa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datos_extra`
--

CREATE TABLE `datos_extra` (
  `id_extra` int NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `id_cliente` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_factura`
--

CREATE TABLE `detalle_factura` (
  `id_detalle` int NOT NULL,
  `id_factura` int NOT NULL,
  `id_producto` int DEFAULT NULL,
  `id_servicio` int DEFAULT NULL,
  `cantidad` int NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `facturas`
--

CREATE TABLE `facturas` (
  `id_factura` int NOT NULL,
  `id_cliente` int NOT NULL,
  `fecha_factura` datetime NOT NULL,
  `total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial_medico`
--

CREATE TABLE `historial_medico` (
  `id_historial` int NOT NULL,
  `id_mascota` int NOT NULL,
  `id_veterinario` int DEFAULT NULL,
  `fecha_consulta` date NOT NULL,
  `diagnostico` text,
  `tratamiento` text,
  `observaciones` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `id_movimiento` int NOT NULL,
  `id_producto` int NOT NULL,
  `tipo_movimiento` enum('entrada','salida') NOT NULL,
  `cantidad` int NOT NULL,
  `fecha_movimiento` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

CREATE TABLE `mascotas` (
  `id_mascota` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `edad` int DEFAULT NULL,
  `raza` varchar(255) DEFAULT NULL,
  `especie` enum('perro','gato','otro') NOT NULL,
  `sexo` enum('macho','hembra') NOT NULL,
  `id_cliente` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `precio` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  `categoria` enum('alimento','accesorio','medicamento') NOT NULL,
  `fecha_caducidad` date DEFAULT NULL,
  `imagen` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `id_servicio` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `precio` decimal(10,2) NOT NULL,
  `imagen` mediumtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `veterinarios`
--

CREATE TABLE `veterinarios` (
  `id_veterinario` int NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `especialidad` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`id_admin`),
  ADD UNIQUE KEY `id_admin` (`id_admin`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD UNIQUE KEY `correo_electronico` (`correo_electronico`);

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id_cita`),
  ADD UNIQUE KEY `id_cita` (`id_cita`),
  ADD KEY `id_cliente` (`id_cliente`),
  ADD KEY `id_mascota` (`id_mascota`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id_cliente`),
  ADD UNIQUE KEY `id_cliente` (`id_cliente`),
  ADD UNIQUE KEY `usuario` (`usuario`),
  ADD UNIQUE KEY `correo_electronico` (`correo_electronico`);

--
-- Indices de la tabla `datos_extra`
--
ALTER TABLE `datos_extra`
  ADD PRIMARY KEY (`id_extra`),
  ADD UNIQUE KEY `id_extra` (`id_extra`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indices de la tabla `detalle_factura`
--
ALTER TABLE `detalle_factura`
  ADD PRIMARY KEY (`id_detalle`),
  ADD UNIQUE KEY `id_detalle` (`id_detalle`),
  ADD KEY `id_factura` (`id_factura`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_servicio` (`id_servicio`);

--
-- Indices de la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD PRIMARY KEY (`id_factura`),
  ADD UNIQUE KEY `id_factura` (`id_factura`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indices de la tabla `historial_medico`
--
ALTER TABLE `historial_medico`
  ADD PRIMARY KEY (`id_historial`),
  ADD UNIQUE KEY `id_historial` (`id_historial`),
  ADD KEY `id_mascota` (`id_mascota`),
  ADD KEY `id_veterinario` (`id_veterinario`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id_movimiento`),
  ADD UNIQUE KEY `id_movimiento` (`id_movimiento`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD PRIMARY KEY (`id_mascota`),
  ADD UNIQUE KEY `id_mascota` (`id_mascota`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD UNIQUE KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`id_servicio`),
  ADD UNIQUE KEY `id_servicio` (`id_servicio`);

--
-- Indices de la tabla `veterinarios`
--
ALTER TABLE `veterinarios`
  ADD PRIMARY KEY (`id_veterinario`),
  ADD UNIQUE KEY `id_veterinario` (`id_veterinario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `id_admin` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `id_cita` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id_cliente` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT de la tabla `datos_extra`
--
ALTER TABLE `datos_extra`
  MODIFY `id_extra` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `detalle_factura`
--
ALTER TABLE `detalle_factura`
  MODIFY `id_detalle` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `facturas`
--
ALTER TABLE `facturas`
  MODIFY `id_factura` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `historial_medico`
--
ALTER TABLE `historial_medico`
  MODIFY `id_historial` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inventario`
--
ALTER TABLE `inventario`
  MODIFY `id_movimiento` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `id_mascota` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `id_servicio` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `veterinarios`
--
ALTER TABLE `veterinarios`
  MODIFY `id_veterinario` int NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `citas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `citas_ibfk_2` FOREIGN KEY (`id_mascota`) REFERENCES `mascotas` (`id_mascota`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `citas_ibfk_3` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `citas_ibfk_4` FOREIGN KEY (`id_mascota`) REFERENCES `mascotas` (`id_mascota`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `datos_extra`
--
ALTER TABLE `datos_extra`
  ADD CONSTRAINT `datos_extra_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`) ON DELETE CASCADE;

--
-- Filtros para la tabla `detalle_factura`
--
ALTER TABLE `detalle_factura`
  ADD CONSTRAINT `detalle_factura_ibfk_1` FOREIGN KEY (`id_factura`) REFERENCES `facturas` (`id_factura`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_factura_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `detalle_factura_ibfk_3` FOREIGN KEY (`id_servicio`) REFERENCES `servicios` (`id_servicio`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `facturas`
--
ALTER TABLE `facturas`
  ADD CONSTRAINT `facturas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `historial_medico`
--
ALTER TABLE `historial_medico`
  ADD CONSTRAINT `historial_medico_ibfk_1` FOREIGN KEY (`id_mascota`) REFERENCES `mascotas` (`id_mascota`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `historial_medico_ibfk_2` FOREIGN KEY (`id_veterinario`) REFERENCES `veterinarios` (`id_veterinario`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `historial_medico_ibfk_3` FOREIGN KEY (`id_mascota`) REFERENCES `mascotas` (`id_mascota`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `historial_medico_ibfk_4` FOREIGN KEY (`id_veterinario`) REFERENCES `veterinarios` (`id_veterinario`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `mascotas_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

