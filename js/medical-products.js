/* =========================================================
   VIDHATA PLASTICS — MEDICAL PRODUCTS SHOWCASE HANDLER
   js/medical-products.js
   ========================================================= */

'use strict';

// ── Medical Products Database ──
const MEDICAL_PRODUCTS = [
  // ── Catheter ──
  {
    id: "spinal-epidural-kit",
    title: "Combined Spinal Epidural Catheter Kit",
    category: "Catheter",
    image: "images/Catheter/combined spinal epidural catheter kit.jpg",
    images: [
      "images/Catheter/combined spinal epidural catheter kit.jpg",
      "images/Catheter/combined-spinal-epidural-catheter-kit-technical.png"
    ],
    description: "A comprehensive regional anesthesia kit designed for combined spinal-epidural (CSE) blocks. It integrates a Tuohy needle and a pencil-point spinal needle to enable rapid spinal block onset with the capability of continuous epidural medication delivery, streamlining post-operative analgesia.",
    features: [
      "Needle-Through-Needle design enables spinal needle to pass through Tuohy needle for a single-interspace approach.",
      "Ergonomic Tuohy needle features clear depth graduation markings for precise insertion control.",
      "Atraumatic Whitacre/Pencil-Point spinal needle reduces cerebrospinal fluid loss and minimizes PDPH risk.",
      "Highly flexible nylon catheter with a soft, rounded tip to prevent vessel and nerve trauma.",
      "Loss-of-Resistance (LOR) syringe is low-friction, ensuring highly tactile confirmation of the epidural space.",
      "Hydrophobic 0.2 µm filter blocks bacterial contamination during continuous infusion."
    ],
    specs: {
      "Tuohy Needle": "18G with clear hub & depth markers",
      "Spinal Needle": "27G Pencil Point (Sprotte/Whitacre type) with guide",
      "Epidural Catheter": "20G Multi-port Nylon, flexible soft tip, kink-resistant",
      "LOR Syringe": "10 ml low-friction Loss of Resistance syringe",
      "Sterilization": "Ethylene Oxide (EO) Sterile",
      "Compliance": "ISO 13485, CE Compliant"
    }
  },
  {
    id: "epidural-catheter-kit",
    title: "Epidural Catheter Kit",
    category: "Catheter",
    image: "images/Catheter/epidural catheter kit.jpg",
    description: "Designed for continuous epidural infusion to manage regional anesthesia and post-operative pain relief. Features highly flexible, radiopaque catheters for precise placement under fluoroscopic control.",
    features: [
      "Premium Tuohy needle has a polished inner bevel edge to eliminate catheter shearing risk during insertion.",
      "Graduated 90 cm catheter with highly visible depth markers for safe positioning.",
      "Soft, closed tip with 3 lateral eyes ensures uniform distribution of local anesthetics.",
      "Low-friction Loss of Resistance (LOR) syringe provides sensitive tactile feedback during air or saline techniques.",
      "0.2-micron bacteria-retentive flat filter guarantees fluid microbial safety.",
      "Detachable twist-lock connector provides a secure, leak-proof connection to infusion lines."
    ],
    specs: {
      "Tuohy Needle": "16G or 18G with curved tip to direct catheter",
      "Catheter Length": "90 cm with graduation markings",
      "Catheter Type": "Closed tip with 3 lateral eyes for uniform distribution",
      "Flat Filter": "0.2 μm hydrophobic bacteria-retentive flat filter",
      "Sterilization": "EO Sterile",
      "Material": "Medical-grade Nylon / Polyurethane"
    }
  },

  // ── Infusion ──
  {
    id: "transfer-spike",
    title: "Transfer Spike",
    category: "Infusion",
    image: "images/Infusion/transfer-spike.jpg",
    images: [
      "images/Infusion/transfer-spike.jpg",
      "images/Infusion/transfer-spike-technical.jpg"
    ],
    description: "The Transfer Spike is a medical device designed for the efficient transfer of fluids between containers, specifically tailored for use with rubber-stoppered vials and bag sets. This device streamlines the process of diluting powdered medications, enhancing safety and efficiency in pharmaceutical practices.",
    features: [
      "Fits securely into vial and port rubber stoppers, ensuring sterility.",
      "Large diameter for fast fluid transfer, even with non-evacuated vials.",
      "Secure handling reduces spills and contamination.",
      "Prevents air contamination and maintains medication integrity.",
      "Reduces vial piercing, lowering contamination risks.",
      "PVC-free, latex-free, and DEHP-free, safe for sensitive patients."
    ],
    specs: {
      "Reference Code": "90314",
      "Size": "Standard (Grip Flange)",
      "Material": "Medical Grade Polymer (DEHP-Free, PVC-Free, Latex-Free)",
      "Sterilization": "Ethylene Oxide (EO) Sterile",
      "Packaging": "Individual Sterile Peel Pouch",
      "Compliance": "EN ISO 13485:2016, CE Certified"
    }
  },
  {
    id: "filter-infusion-set",
    title: "0.2 Micron Filter (Non-DEHP) Infusion Set",
    category: "Infusion",
    image: "images/Infusion/0.2 MICRON FILTER (NON-DEHP) Infusion Set.jpg",
    description: "High-end gravity IV administration set featuring a 0.2-micron polyethersulfone (PES) membrane filter to block bacteria, particulate matter, and air. Completely DEHP-free, making it safe for chemotherapy drugs and lipid emulsions.",
    features: [
      "Hydrophilic PES 0.2 μm membrane filter effectively eliminates endotoxins, bacteria, and particulates.",
      "100% DEHP-free medical-grade polyurethane tubing ensures safe delivery of paclitaxel and lipid drugs.",
      "Integrated needleless luer-activated Y-site prevents needle-stick injuries during administration.",
      "Kink-resistant, highly transparent tubing for smooth flow monitoring and patient mobility.",
      "Vented drip chamber with a sharp piercing spike for immediate fluid bag attachment."
    ],
    specs: {
      "Filter Membrane": "0.2 μm PES (polyethersulfone) hydrophilic membrane",
      "Tubing Material": "100% DEHP-free, photoprotective optional layer",
      "Drip Rate": "20 drops/ml",
      "Tubing Length": "180 cm kink-resistant tubing",
      "Y-Site": "Needleless injection port (luer activated)",
      "Sterilization": "EO Sterile"
    }
  },
  {
    id: "three-way-stopcock",
    title: "3-Way Stopcock",
    category: "Infusion",
    image: "images/Infusion/3 way stock cock.jpg",
    description: "A crystal-clear, pressure-resistant three-way stopcock for simultaneous administration of multiple fluids or drug regimens. Fully rotatable handle allows 360-degree direction control without flow restriction.",
    features: [
      "Pressure-resistant polycarbonate body remains transparent and crack-free under lipid exposure.",
      "Fully rotatable handle with tactile 360-degree click feedback for exact fluid flow direction.",
      "Minimal internal dead space prevents fluid entrapment and medication mixing.",
      "Leak-proof male and female luer locks ensure secure connection to IV catheters and extension sets.",
      "Color-coded handles (blue/red/white) for easy identification of arterial or venous lines."
    ],
    specs: {
      "Pressure Rating": "4.5 bar (65 psi) continuous operating pressure",
      "Material": "Medical Grade Polycarbonate (lipid-resistant housing)",
      "Connectors": "Dual female luer ports and one male luer lock",
      "Handle Rotation": "360° rotation with soft click indicators",
      "Dead Space": "Minimal fluid priming volume (< 0.2 ml)"
    }
  },
  {
    id: "autostop-infusion-set",
    title: "Auto-Stop IV Infusion Set",
    category: "Infusion",
    image: "images/Infusion/Auto Stop IV infusion set.jpg",
    description: "Enforces passive patient safety via an integrated auto-stop filter membrane in the drip chamber. Automatically stops flow when the fluid container runs dry, preventing line dry-out and air entry into the bloodstream.",
    features: [
      "Innovative auto-stop membrane prevents the line from running dry once the bag is empty.",
      "Eliminates air entry risks, providing automatic passive protection against air embolism.",
      "Vented drip chamber features a 15-micron fluid filter to block large particles.",
      "Highly responsive roller clamp enables exact rate adjustment and quick shut-off.",
      "Flexible, kink-resistant tubing helps maintain consistent delivery rates."
    ],
    specs: {
      "Auto-Stop Membrane": "Hydrophobic barrier membrane (stops air, allows fluid)",
      "Drip Rate": "20 drops/ml",
      "Tubing Material": "Flexible, medical grade PVC",
      "Inline Fluid Filter": "15 μm particle filter in drip chamber",
      "Sterilization": "EO Sterile"
    }
  },
  {
    id: "extension-line-range",
    title: "Extension Line (Complete Range)",
    category: "Infusion",
    image: "images/Infusion/Extension Line(Complete range).jpg",
    description: "A comprehensive range of high-pressure and low-pressure extension lines to expand vascular access options. Made of medical-grade tubing with secure luer lock connections for leak-proof performance.",
    features: [
      "A full range of low-volume and high-pressure configurations suitable for ICU and anesthesia.",
      "Durable, kink-resistant polyurethane tubing withstands pressure up to 500 psi.",
      "Fully transparent lines allow clear visualization of fluid and air bubbles.",
      "Standardized luer lock connectors ensure leak-free performance under pressure.",
      "Available in multiple lengths from 10 cm to 200 cm to fit various clinical needs."
    ],
    specs: {
      "Lengths Available": "10 cm, 25 cm, 50 cm, 100 cm, 150 cm, 200 cm",
      "Inner Diameter": "1.0 mm (low prime) to 2.0 mm (high flow)",
      "Connectors": "Male/Female Luer Lock with protective caps",
      "Max Pressure": "Up to 500 psi for pressure lines",
      "Material": "Kink-resistant Polyurethane or PVC"
    }
  },
  {
    id: "infusion-set-vented",
    title: "Infusion Set (Vented)",
    category: "Infusion",
    image: "images/Infusion/Infusion Set Vented.jpg",
    description: "Standard clinical IV administration set with a sharp piercing spike and integrated air vent. The air vent features a hydrophobic membrane filter to prevent bacterial contamination from incoming room air.",
    features: [
      "Sharp piercing spike fits easily into IV bags and glass bottles.",
      "Integrated air vent with a hydrophobic membrane filter blocks airborne bacterial entry.",
      "Flexible, transparent drip chamber includes a 15 µm disc filter to trap particulates.",
      "Precision V-clamp controller allows for stable gravity-flow rate adjustments.",
      "EO Sterile and individually packed to maintain maximum sterility."
    ],
    specs: {
      "Air Vent": "Hydrophobic filter with snap-on protective cap",
      "Spike Type": "Sharp ABS double-channel spike",
      "Drip Chamber": "Flexible, clear chamber with 15 μm fluid filter",
      "Roller Clamp": "Precision V-clamp regulator",
      "Tubing Length": "150 cm",
      "Drip Rate": "20 drops/ml"
    }
  },
  {
    id: "infusion-set-threeway",
    title: "Infusion Set with Three-Way Stopcock",
    category: "Infusion",
    image: "images/Infusion/Infusion Set with Three Way stop Cock.jpg",
    description: "Combines an IV administration line with an integrated 3-way stopcock at the patient end. Streamlines clinical access by allowing immediate secondary drug injections or blood sampling without line interruption.",
    features: [
      "Pre-assembled kit minimizes preparation time and reduces the risk of touch contamination.",
      "Integrated 3-way stopcock at the patient end allows easy access for secondary drug injections.",
      "Vented spike features a hydrophobic air filter to maintain constant pressure.",
      "Clear, lipid-resistant stopcock body allows immediate detection of air bubbles.",
      "Rotating luer lock ensures a secure and leak-free patient connection."
    ],
    specs: {
      "Spike": "Vented spike with hydrophobic air filter",
      "Drip Rate": "20 drops/ml",
      "Integrated Valve": "3-Way stopcock with 360-degree rotatable tap",
      "Tubing Length": "180 cm total length",
      "Sterilization": "EO Sterile"
    }
  },
  {
    id: "infusion-set-nonvented",
    title: "Infusion Set (Non-Vented)",
    category: "Infusion",
    image: "images/Infusion/Infussion Set Non - Vented.jpeg",
    description: "Standard non-vented infusion set optimized for closed, collapsible plastic IV bags. Drip chamber features an integrated fluid filter and smooth transparent walls for precise drop monitoring.",
    features: [
      "Designed specifically for closed, collapsible plastic IV bags.",
      "Non-vented sharp spike prevents unwanted air introduction.",
      "Smooth transparent walls of the drip chamber enable easy drop monitoring.",
      "High-performance roller clamp offers precise gravity flow control.",
      "EO Sterile and pyrogen-free formulation."
    ],
    specs: {
      "Spike": "Non-vented sharp plastic spike",
      "Fluid Filter": "15 μm disc filter",
      "Roller Clamp": "High-accuracy rate-control roller clamp",
      "Tubing Length": "150 cm",
      "Drip Rate": "20 drops/ml",
      "Material": "Medical Grade PVC"
    }
  },
  {
    id: "micro-infusion-set",
    title: "Micro Infusion Set with Air Vent",
    category: "Infusion",
    image: "images/Infusion/Micro Infusion Set with Air vent.jpg",
    description: "Micro-drip IV administration set tailored specifically for pediatric, neonatal, and ICU patients requiring highly controlled gravity flow of fluids and medications.",
    features: [
      "Precision stainless steel drop needle delivers 60 micro-drops/ml.",
      "Perfect for neonatal, pediatric, and critical care medication dosing.",
      "Hydrophobic bacteria-retentive air vent maintains smooth, consistent flow.",
      "Flexible, clear drip chamber allows easy fluid level monitoring.",
      "Phthalate-free and DEHP-free options preserve patient safety."
    ],
    specs: {
      "Drip Rate": "60 drops/ml (Micro drip)",
      "Air Vent": "Hydrophobic bacteria-retentive vent",
      "Drip Chamber": "Graduated drip tube with stainless steel drop needle",
      "Tubing Length": "150 cm",
      "Material": "Pliable medical PVC, DEHP-free options available"
    }
  },
  {
    id: "premium-infusion-set",
    title: "Premium Based Infusion Set",
    category: "Infusion",
    image: "images/Infusion/Premium Based Infusion Set.jpg",
    description: "Premium-grade infusion set designed for precise gravity flow regulation. Includes a dedicated dial flow regulator that allows clinicians to dial in flow rates directly in ml/hr without counting drops.",
    features: [
      "Built-in dial flow regulator permits direct flow rate adjustments in ml/hr.",
      "Eliminates the need for manual drop counting, saving valuable nursing time.",
      "Biocompatible, kink-resistant tubing maintains constant delivery rates.",
      "Self-sealing injection Y-site supports easy bolus drug delivery.",
      "Secure rotating luer lock prevents accidental disconnections."
    ],
    specs: {
      "Flow Regulator": "Dial flow controller (range: 5 to 250 ml/hour)",
      "Tubing": "Super-soft, kink-resistant polyurethane (TPU) tubing",
      "Injection Port": "Self-sealing latex-free Y-site",
      "Drip Rate": "20 drops/ml",
      "Connector": "Rotating Luer Lock connector"
    }
  },
  {
    id: "elastomeric-pump",
    title: "Elastomeric Infusion Pump",
    category: "Infusion",
    image: "images/Infusion/elastomeric infusion pump.jpg",
    description: "A continuous-infusion portable device utilizing elastomeric balloon pressure to deliver liquid medications at preset flow rates. Commonly used for ambulatory chemotherapy, home antibiotics, and patient-controlled analgesia (PCA).",
    features: [
      "Elastomeric silicone balloon provides constant, uniform pressure for continuous drug delivery.",
      "Ambulatory design allows patients to receive treatment comfortably at home.",
      "Inline particulate and air-eliminating filters ensure clean fluid pathways.",
      "Integrated capillary flow restrictor guarantees precise pre-set infusion rates.",
      "Individually packed, EO Sterile, and completely disposable."
    ],
    specs: {
      "Balloon Material": "Highly elastic, medical grade Silicone",
      "Volume Capacities": "100 ml, 275 ml",
      "Flow Rates": "2 ml/hr, 5 ml/hr, 10 ml/hr options",
      "Flow Control": "Integrated capillary flow restrictor glass tube",
      "Safety Features": "Particle and air elimination filters inline"
    }
  },
  {
    id: "ext-line-stopcock",
    title: "Extension Line with 3-Way Stopcock",
    category: "Infusion",
    image: "images/Infusion/extension line with 3 way stop cock.jpg",
    description: "Pre-assembled extension line combined with a robust 3-way stopcock. Offers extended reach and auxiliary drug injection ports for complex surgical or ICU fluid management configurations.",
    features: [
      "Pre-assembled line eliminates the need for manual fittings, reducing infection risk.",
      "Integrated lipid-resistant 3-way stopcock provides multiple injection ports.",
      "Durable, pressure-rated tubing handles up to 65 psi operating pressure.",
      "Clear tubing ensures immediate visibility of bubbles or flow interruptions.",
      "Individually wrapped and EO sterile."
    ],
    specs: {
      "Tubing Length": "30 cm, 50 cm, 100 cm options",
      "Tubing OD/ID": "3.0 mm / 1.5 mm",
      "Stopcock Ports": "Lipid-resistant polycarbonate, 2 female, 1 male",
      "Pressure Rating": "4.5 bar (65 psi)",
      "Sterilization": "EO Sterile"
    }
  },
  {
    id: "ext-line-flowregulator",
    title: "Extension Line with Flow Regulator",
    category: "Infusion",
    image: "images/Infusion/extension line with flow regulator.jpg",
    description: "A specialized short extension line featuring an inline dial-rate regulator. Essential for standardizing infusion rates when electronic infusion pumps are unavailable or during patient transport.",
    features: [
      "Dial flow regulator permits flow rate control between 5 and 250 ml/hr.",
      "Needleless Y-site port provides a safe pathway for secondary medication delivery.",
      "Kink-resistant polyurethane line ensures consistent delivery rates.",
      "Secure luer locks prevent leakage under pressure.",
      "EO Sterile, pyrogen-free, and single-use."
    ],
    specs: {
      "Flow Rate Range": "5 ml/hr to 250 ml/hr dial control",
      "Tubing Length": "45 cm",
      "Injection Port": "Self-sealing needleless valve",
      "Material": "Kink-resistant medical polyurethane",
      "Sterilization": "EO Sterile"
    }
  },
  {
    id: "extension-line-standard",
    title: "Extension Line (Standard)",
    category: "Infusion",
    image: "images/Infusion/extension line.jpg",
    description: "High-quality, flexible extension line designed to minimize catheter movement and patient distress. Ensures a secure connection with no flow reduction or kinking.",
    features: [
      "Highly flexible, kink-resistant tubing extends patient mobility.",
      "Phthalate-free medical PVC prevents plasticizer migration.",
      "Male-to-female luer lock threads guarantee leak-proof connections.",
      "Available in multiple lengths to accommodate various clinical setups.",
      "Fluid path sterile and pyrogen-free."
    ],
    specs: {
      "Length": "10 cm to 150 cm customizable range",
      "Material": "Soft medical-grade PVC, phthalate-free",
      "Connectors": "Male to Female Luer Lock",
      "Sterility": "EO Sterile, pyrogen-free"
    }
  },
  {
    id: "measured-volume-set",
    title: "Measured Volume Infusion Set",
    category: "Infusion",
    image: "images/Infusion/measured volume infusion set (complete Range).jpg",
    description: "A burette-style administration set specifically designed for pediatric and neonatal infusions where fluid volume must be precisely metered and restricted to prevent fluid overload.",
    features: [
      "Rigid, graduated 100/150 ml burette chamber for precise volume control.",
      "Integrated automatic shut-off valve prevents dry lines and air infusion.",
      "60 micro-drops/ml drip chamber optimized for pediatric fluid management.",
      "Inline 15 µm disc filter prevents large particle administration.",
      "Air vent with a hydrophobic filter protects against airborne contaminants."
    ],
    specs: {
      "Burette Capacity": "100 ml or 150 ml graduated chamber",
      "Micro-Drip": "60 drops/ml",
      "Shut-off Valve": "Integrated automatic floating shut-off valve",
      "Filter Size": "15 μm inside the drip chamber",
      "Material": "Clear rigid Polycarbonate burette, soft PVC lines"
    }
  },
  {
    id: "pressure-monitoring-line",
    title: "Pressure Line Monitoring",
    category: "Infusion",
    image: "images/Infusion/pressure line monitering.jpg",
    description: "Extremely thick-walled, low-compliance tubing designed for direct blood pressure monitoring systems. Transmits precise hemodynamic waveforms from arterial/venous catheters to pressure transducers.",
    features: [
      "Thick-walled, low-compliance tubing preserves pressure wave integrity.",
      "Delivers highly accurate hemodynamic readings on patient monitors.",
      "Rigid inner layer prevents pressure damping and waveform distortion.",
      "Withstands pressure up to 500 psi, ensuring safety in arterial lines.",
      "Male and female luer lock connectors ensure secure connection."
    ],
    specs: {
      "Max Pressure": "500 psi (34 bar)",
      "Tubing ID": "1.0 mm (minimizes fluid volume & damping)",
      "Lengths Available": "30 cm, 100 cm, 150 cm, 200 cm",
      "Material": "Rigid PE (Polyethylene) inner layer / PVC outer layer"
    }
  },
  {
    id: "pvc-free-extline",
    title: "PVC-Free Extension Line",
    category: "Infusion",
    image: "images/Infusion/pvc free extension line.jpg",
    description: "A dedicated co-extruded PVC-free extension line. Essential for infusing highly lipophilic medications or photosensitive compounds, avoiding drug absorption and plasticizer elution.",
    features: [
      "Co-extruded polyethylene (PE) inner lumen prevents drug absorption.",
      "Ensures accurate delivery of paclitaxel, nitroglycerin, and lipid drugs.",
      "Polyurethane (TPU) outer layer provides excellent strength and flexibility.",
      "100% PVC-free and DEHP-free formulation.",
      "Luer lock thread caps ensure sterility prior to clinical use."
    ],
    specs: {
      "Inner Layer": "Polyethylene (PE) (chemically inert, PVC-free)",
      "Outer Layer": "Polyurethane (TPU) (strength and flexibility)",
      "Inner Diameter": "1.2 mm",
      "Length": "150 cm",
      "Connectors": "Luer Lock male-female"
    }
  },

  // ── Infusion Including Chemo ──
  {
    id: "chemo-infusion-set-range",
    title: "Chemotherapy Infusion Set (Complete Range)",
    category: "Infusion Including Chemo",
    image: "images/Infusion Including Chemo/chemo theraphy infusion set(complete Range).jpg",
    description: "A complete range of UV-blocking amber-tinted infusion administration sets. Specifically designed for delivering light-sensitive chemotherapy drugs securely, eliminating UV degradation.",
    features: [
      "Amber-tinted tubing blocks UV and visible light from 290nm to 450nm.",
      "Protects highly light-sensitive oncology drugs from chemical degradation.",
      "Multi-layer co-extruded PE inner lining prevents taxane absorption.",
      "Integrated 0.2 µm hydrophobic air-eliminating oncology filter blocks particulates.",
      "DEHP-free and PVC-free fluid path guarantees patient safety."
    ],
    specs: {
      "Light Protection": "Amber tint blocks UV light (290nm to 450nm)",
      "Material": "Multi-layer co-extruded Polyethylene (PE) inner lumen, PVC-Free",
      "Drip Rate": "20 drops/ml",
      "Inline Filter": "0.2 μm hydrophobic air-eliminating oncology filter",
      "Sterilization": "EO Sterile"
    }
  },
  {
    id: "chemo-infusion-set-std",
    title: "Chemotherapy Infusion Set",
    category: "Infusion Including Chemo",
    image: "images/Infusion Including Chemo/chemotheraphy infusion set.jpg",
    description: "Oncology-specific IV administration set featuring a co-extruded inner lining that prevents chemotherapy drugs from absorbing into the tube walls, ensuring accurate therapeutic dosing.",
    features: [
      "Oncology-grade co-extruded tubing prevents oncology drug absorption.",
      "Amber coloration shields light-sensitive chemotherapy formulations.",
      "Integrated 0.2/1.2 µm filter provides sterile filtration and blocks contaminants.",
      "Heavy-duty roller clamp allows rapid shut-off and rate management.",
      "Luer lock connectors ensure leak-free operation."
    ],
    specs: {
      "Tubing Structure": "Double-layered co-extrusion (PVC-Free inner line)",
      "Filter Size": "1.2 μm / 0.2 μm inline PES filter options",
      "Drip Rate": "20 drops/ml",
      "Clamps": "Secure pinch clamp for instant line shutoff",
      "Sterility": "EO Sterile"
    }
  },
  {
    id: "chemo-extline-set",
    title: "Chemotherapy Extension Line Set",
    category: "Infusion Including Chemo",
    image: "images/Infusion Including Chemo/chemotherapy extension line set.jpg",
    description: "A dedicated amber-shaded extension tubing line designed to extend oncology IV setups while preserving light protection. Features heavy-duty slide clamps to prevent accidental drug spillages.",
    features: [
      "Amber-shaded polyurethane tubing blocks UV degradation.",
      "100% PVC-free and DEHP-free formulation ensures chemical compatibility.",
      "Durable slide clamp provides instant line occlusion.",
      "Standard luer lock fittings connect securely to central lines and IV ports.",
      "Fluid-path sterile and pyrogen-free."
    ],
    specs: {
      "UV Blocking": "Amber co-extrusion shielding photosensitive chemicals",
      "Material": "100% PVC-Free and DEHP-Free Polyurethane",
      "Connectors": "Luer Lock with male/female leak-proof threads",
      "Length": "150 cm",
      "Pinch Clamp": "Heavy-duty slide clamp included"
    }
  },
  {
    id: "chemo-extline-flowregulator",
    title: "Chemotherapy Extension Line with Flow Regulator",
    category: "Infusion Including Chemo",
    image: "images/Infusion Including Chemo/chemotherapy extension line with flow regulator.jpg",
    description: "Oncology extension line featuring light protection and a built-in dial-flow regulator. Allows gravity-based chemotherapy drug dosing with strict speed limitations.",
    features: [
      "Amber co-extruded tubing shields light-sensitive chemotherapeutics.",
      "Dial flow controller provides flow regulation from 5 to 250 ml/hr.",
      "PVC-free and DEHP-free polyurethane line prevent drug-plasticizer interaction.",
      "Needleless Y-site allows secondary medication delivery.",
      "Individually packed, sterile, and pyrogen-free."
    ],
    specs: {
      "Light Protection": "Amber double-layered tubing",
      "Regulator Range": "5 to 250 ml/hour dial controller",
      "Material": "PVC-Free / DEHP-Free co-extruded TPU",
      "Length": "45 cm",
      "Sterilization": "EO Sterile"
    }
  },
  {
    id: "infusion-ivset-flowregulator",
    title: "Infusion Intravenous Set with Flow Regulator",
    category: "Infusion Including Chemo",
    image: "images/Infusion Including Chemo/infusion intravenous set with flow regulator.jpg",
    description: "High-accuracy gravity infusion set equipped with a built-in dial-flow regulator. Provides constant flow rates during patient transport or ambulatory procedures.",
    features: [
      "Dial flow regulator enables rate setting without drop calculation.",
      "Self-sealing luer activated Y-site port for bolus delivery.",
      "Standard vented spike with a hydrophobic air filter.",
      "Clear drip chamber with a 15 µm disc filter.",
      "EO Sterile and single-use."
    ],
    specs: {
      "Flow Dial": "Calibrated dial controller (5-250 ml/hr)",
      "Drip Rate": "20 drops/ml",
      "Y-Port": "Self-sealing latex-free injection port",
      "Tubing Length": "150 cm",
      "Material": "Medical-grade kink-resistant PVC"
    }
  },

  // ── Nephrology ──
  {
    id: "fistula-needle-set",
    title: "Arteriovenous Fistula Needle Set",
    category: "Nephrology",
    image: "images/Nephrology/arteriovenous fistula needle sets.jpg",
    description: "High-precision vascular access needle sets designed for hemodialysis. Feature an ultra-thin walled, siliconized needle tip to minimize puncture pain, vessel trauma, and insertion friction.",
    features: [
      "Ultra-thin walled, siliconized needle tip minimizes insertion pain.",
      "Precision-crafted backeye optimizes blood flow rates and reduces turbulency.",
      "Color-coded fixed or rotating wings simplify size identification and placement.",
      "Kink-resistant tubing with a robust pinch clamp prevents leakage.",
      "Sterilized by Ethylene Oxide, non-pyrogenic."
    ],
    specs: {
      "Gauges Available": "15G (orange), 16G (green), 17G (yellow)",
      "Needle Length": "1 inch (25 mm)",
      "Wing Style": "Rotating wings or fixed flat wings",
      "Backeye": "Precision cut backeye for optimized blood flow rates",
      "Tubing Length": "30 cm flexible PVC line with pinch clamp"
    }
  },
  {
    id: "dialysis-tubing-tp",
    title: "Haemodialysis Blood Tubing (TP)",
    category: "Nephrology",
    image: "images/Nephrology/haemodialysis_blood_tubing_tp.png",
    description: "Premium haemodialysis bloodline set featuring integrated transducer protectors (TP). Includes hydrophobic membranes to prevent blood from entering and contaminating machine sensors.",
    features: [
      "Inline transducer protectors with 0.2 µm hydrophobic PTFE filters.",
      "Protects dialysis machine pressure sensors from blood contamination.",
      "High-rebound silicone pump segment ensures consistent flow rates.",
      "Color-coded clamps (red/blue) simplify arterial and venous routing.",
      "Biocompatible, medical-grade PVC construction."
    ],
    specs: {
      "Transducer Protectors": "0.2 μm hydrophobic PTFE membrane filters",
      "Pump Segment": "High-rebound medical silicone tubing segment",
      "Blood Ports": "Luer lock connectors with color-coded arterial/venous clamps",
      "Biocompatibility": "DEHP-Free medical PVC, non-pyrogenic",
      "Sterilization": "EO Sterile"
    }
  },
  {
    id: "dialysis-tubing-std",
    title: "Haemodialysis Blood Tubing",
    category: "Nephrology",
    image: "images/Nephrology/haemodialysis blood tubings.jpg",
    description: "Standard arterial-venous bloodline sets for renal hemodialysis therapy. Configured for complete compatibility with major dialysis machine models, featuring kink-free smooth flows.",
    features: [
      "Universal fit bloodline set compatible with major dialysis systems.",
      "High-precision extrusion segment ensures pump calibration accuracy.",
      "Self-sealing, latex-free access ports for medication injection.",
      "Smooth internal surface minimizes blood cell lysis and clotting.",
      "EO Sterile, pyrogen-free, and non-toxic."
    ],
    specs: {
      "Components": "Arterial line (red) and Venous line (blue)",
      "Pump Segment ID": "8.0 mm (high-precision extrusion)",
      "Injection Sites": "Latex-free self-sealing access ports",
      "Priming Volume": "Approx. 130 ml venous / 80 ml arterial",
      "Sterility": "EO Sterile"
    }
  },
  {
    id: "dialysis-catheter-set",
    title: "Haemodialysis Catheter and Set",
    category: "Nephrology",
    image: "images/Nephrology/haemodialysis catheter and set.jpg",
    description: "Acute hemodialysis catheter kit featuring a thermosensitive dual-lumen polyurethane shaft. The soft blue tip decreases friction and reduces venous vessel wall erosion.",
    features: [
      "Thermosensitive polyurethane catheter softens at body temperature.",
      "Atraumatic soft tip reduces venous vessel wall trauma.",
      "Dual-lumen configuration maximizes dialysis flow efficiency.",
      "Nitinol J-tip guide wire provides excellent kink resistance.",
      "Complete kit simplifies clinical insertion."
    ],
    specs: {
      "Lumen Configuration": "Dual Lumen",
      "Size": "11.5 Fr / 12 Fr",
      "Catheter Lengths": "15 cm, 16 cm, 20 cm",
      "Kit Accessories": "Introducer needle, guide wire, dilators, heparin caps",
      "Sterilization": "EO Sterile"
    }
  },
  {
    id: "hemodialysis-catheter-kit-long-term",
    title: "Hemodialysis Catheter Kit (Long Term)",
    category: "Nephrology",
    image: "images/Nephrology/hemodialysis catheter kit long term.jpg",
    images: [
      "images/Nephrology/hemodialysis catheter kit long term.jpg",
      "images/Catheter/hemodialysis catheter kit long term.jpg"
    ],
    description: "An indwelling, cuffed catheter designed for long-term hemodialysis and apheresis. Features a thermosensitive biocompatible polyurethane shaft, Dacron tissue ingrowth cuff for infection barrier, and high-flow dual-lumen design.",
    features: [
      "Thermosensitive radiopaque polyurethane softens at body temperature to minimize vascular irritation.",
      "Dacron cuff promotes tissue ingrowth, anchoring catheter and forming a barrier against microbial entry.",
      "Dual-lumen geometry optimizes high-volume blood flow up to 400 mL/min with low recirculation.",
      "Soft atraumatic tip design minimizes vessel wall contact and vascular erosion.",
      "Complete Seldinger insertion kit includes tunneling stylet, 18G needle, Nitinol J-wire, dilators, and heparin caps."
    ],
    specs: {
      "Lumen Configuration": "Dual Lumen D-shape / Round lumens",
      "Catheter Sizes": "14.5 Fr / 15 Fr",
      "Catheter Lengths": "19 cm, 23 cm, 28 cm, 33 cm, 36 cm, 40 cm, 45 cm",
      "Cuff Feature": "Dacron tissue-ingrowth antimicrobial barrier cuff",
      "Flow Rate": "Up to 400 mL/min at <250 mmHg arterial pressure",
      "Kit Accessories": "Tunneling stylet, 18G needle, Nitinol J-wire, vessel dilators, scalpel, injection caps",
      "Sterilization": "Ethylene Oxide (EO) Sterile",
      "Compliance": "ISO 13485, CE Certified"
    }
  },
  {
    id: "peritoneal-dialysis-set",
    title: "Peritoneal Dialysis Transfusion Set",
    category: "Nephrology",
    image: "images/Nephrology/peritonial dialysis transfusion set.jpg",
    description: "A sterile gravity-feed peritoneal dialysis transfer set. Incorporates a Y-connector and color-coded clamps to manage dialysis solution instillation and abdominal drainage safely.",
    features: [
      "Robust Y-connector adapter manages fluid bags easily.",
      "Color-coded pinch clamps manage instillation and drainage.",
      "Lightweight, flexible tubing minimizes pulling on the peritoneal catheter.",
      "Fluid-path sterile design ensures patient safety.",
      "Phthalate-free material minimizes chemical leaching."
    ],
    specs: {
      "Connector": "Robust Y-shape polycarbonate adapter",
      "Pinch Clamps": "Color-coded blue/white dialysis flow clamps",
      "Tubing Length": "150 cm flexible, lightweight lines",
      "Sterility": "Fluid path sterile, pyrogen-free",
      "Material": "Medical-grade non-toxic PVC"
    }
  },
  {
    id: "priming-infusion-set",
    title: "Priming Set Intravenous Infusion Set",
    category: "Nephrology",
    image: "images/Nephrology/priming set intravenous infusion set.jpg",
    description: "A high-flow priming administration line set designed for initial flushing and preparation of dialysis cartridges and bloodline segments prior to renal dialysis therapy.",
    features: [
      "Dual spike configuration permits quick flushing from saline bags.",
      "Wide-bore 3.0 mm tubing facilitates rapid priming of bloodlines.",
      "Inline drip chamber features a high-flow fluid filter.",
      "Heavy-duty roller clamp provides positive shutoff.",
      "Sterilized by Ethylene Oxide, pyrogen-free."
    ],
    specs: {
      "Spike Type": "Dual plastic spikes for multi-fluid bag priming",
      "Tubing ID": "3.0 mm high-volume flow line",
      "Drip Rate": "20 drops/ml",
      "Roller Clamp": "High-durability plastic clamp",
      "Sterility": "EO Sterile"
    }
  },
  {
    id: "transducer-protector",
    title: "Transducer Protector",
    category: "Nephrology",
    image: "images/Nephrology/transducer proctector.jpg",
    description: "A critical safety component consisting of a hydrophobic membrane sealed within a rigid plastic housing. Placed inline to protect dialysis machine transducers from blood contamination.",
    features: [
      "Hydrophobic 0.2 µm PTFE membrane blocks aqueous fluid penetration.",
      "Acrylic housing ensures pressure waveform transmission.",
      "Prevents cross-contamination between patients and machine transducers.",
      "Standard female luer lock / male luer slip connectors.",
      "EO Sterile, single-use, and non-pyrogenic."
    ],
    specs: {
      "Membrane Material": "0.2 μm hydrophobic PTFE membrane filter",
      "Housing Material": "Crystal-clear Acrylic / MABS housing",
      "Connections": "Standard female luer lock / male luer slip",
      "Sterilization": "EO Sterile, pyrogen-free"
    }
  },

  // ── Cardiology ──
  {
    id: "cardioplegia-adapters",
    title: "Cardioplegia Adapters",
    category: "cardiology",
    image: "images/cardiology/cardioplegia adopters.jpg",
    description: "Specialized connection adapters designed for cardioplegia delivery circuits during cardiopulmonary bypass surgery. Ensure leak-proof connection to catheter or perfusion lines.",
    features: [
      "Rigid medical-grade polycarbonate housing withstands high flow pressures.",
      "Smooth transition paths minimize fluid shear and turbulence.",
      "Luer lock connectors ensure leak-free perfusion connections.",
      "Individually packed, EO Sterile, and single-use.",
      "ISO 13485 compliant."
    ],
    specs: {
      "Material": "Medical-grade rigid Polycarbonate",
      "Connections": "Male luer lock to slip luer transition segments",
      "Inner Diameter": "Custom flow paths to prevent turbulence",
      "Sterility": "EO Sterile, non-pyrogenic",
      "Compliance": "ISO 13485"
    }
  },
  {
    id: "central-venous-catheter",
    title: "Central Venous Catheter and Set",
    category: "cardiology",
    image: "images/cardiology/central venous catheter and set.jpg",
    description: "A complete Seldinger-technique insertion kit with a multi-lumen central venous catheter (CVC). Allows monitoring of central venous pressure, high-volume infusion, and blood sampling.",
    features: [
      "Multi-lumen polyurethane catheter offers central access ports.",
      "Thermosensitive material softens inside the vein to reduce endothelial trauma.",
      "Nitinol J-tip guide wire provides kink resistance.",
      "Introducer needle facilitates guide wire placement.",
      "Individually packed in a sterile tray."
    ],
    specs: {
      "Catheter Size": "7 Fr Triple Lumen / 5 Fr Double Lumen",
      "Catheter Material": "Radiopaque Polyurethane, softens inside body",
      "Guide Wire": "Super-elastic Nitinol J-Tip guide wire (kink-resistant)",
      "Introducer Needle": "18G Y-shape needle to facilitate guide wire",
      "Sterility": "EO Sterile"
    }
  },
  {
    id: "disposable-bp-transducer",
    title: "Disposable Blood Pressure Transducer and Accessories",
    category: "cardiology",
    image: "images/cardiology/disposable blood pressure transducer and accessories.jpg",
    description: "A high-precision single-channel physiological pressure transducer system designed for continuous invasive blood pressure (IBP) monitoring during critical cardiac care.",
    features: [
      "High-sensitivity sensor provides accurate direct blood pressure waveforms.",
      "Continuous 3 ml/hr flush valve prevents clotting in catheter lines.",
      "Crystal-clear flow channel facilitates priming and bubble removal.",
      "Fully AAMI blood pressure standard compliant.",
      "Sterile, pyrogen-free, and single-use."
    ],
    specs: {
      "Accuracy": "±2% of reading (AAMI blood pressure standard)",
      "Flush Device": "3 ml/hr continuous flush mechanism",
      "Sensitivity": "5.0 μv/V/mmHg",
      "Pressure Range": "-50 to +300 mmHg",
      "Sterilization": "EO Sterile, non-pyrogenic"
    }
  }
];

// ── Showcase Controller Class ──────────────────────────────
class ProductShowcase {
  constructor() {
    this.grid = document.getElementById('catalog-grid');
    this.tabsContainer = document.getElementById('catalog-tabs');
    this.glider = document.getElementById('catalog-glider');
    this.modal = document.getElementById('product-modal');
    this.currentCategory = 'all';

    if (!this.grid || !this.tabsContainer || !this.modal) {
      console.warn('ProductShowcase elements missing, skipping initialization');
      return;
    }

    this.init();
  }

  init() {
    this.renderTabs();
    this.renderProducts(this.currentCategory);
    this.setupEventListeners();
    
    // Initial glider positioning with a minor delay to ensure font loading
    setTimeout(() => {
      const activeTab = this.tabsContainer.querySelector('.catalog-tab.active');
      this.positionGlider(activeTab);
    }, 150);
  }

  positionGlider(activeTab) {
    if (!this.glider || !activeTab) return;
    this.glider.style.left = `${activeTab.offsetLeft}px`;
    this.glider.style.width = `${activeTab.offsetWidth}px`;
  }

  renderTabs() {
    const tabs = this.tabsContainer.querySelectorAll('.catalog-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.positionGlider(tab);
        this.currentCategory = tab.dataset.category;
        this.renderProducts(this.currentCategory);
      });
    });
  }

  renderProducts(category) {
    // Fade out grid
    this.grid.classList.add('fade-out');

    setTimeout(() => {
      this.grid.innerHTML = '';
      
      const filtered = category === 'all' 
        ? MEDICAL_PRODUCTS 
        : MEDICAL_PRODUCTS.filter(p => p.category.toLowerCase() === category.toLowerCase());

      if (filtered.length === 0) {
        this.grid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: var(--sp-12); color: var(--clr-text-dim);">No products found in this category.</div>`;
        this.grid.classList.remove('fade-out');
        return;
      }

      filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.setAttribute('data-id', p.id);
        card.setAttribute('data-reveal', 'up');
        
        card.innerHTML = `
          <span class="product-card__badge">${p.category}</span>
          <div class="product-card__img-wrap">
            <img src="${p.image}" alt="${p.title}" class="product-card__img" loading="lazy">
          </div>
          <h4 class="product-card__title">${p.title}</h4>
          <p class="product-card__desc">${p.description.substring(0, 100)}...</p>
          <button class="btn btn--outline-primary btn--sm product-card__btn">View Specifications</button>
        `;

        card.addEventListener('click', () => {
          window.location.href = `product?id=${p.id}`;
        });
        this.grid.appendChild(card);
      });

      if (window.initScrollReveal) {
        window.initScrollReveal();
      }

      // Fade back in
      this.grid.classList.remove('fade-out');
    }, 250);
  }

  setupEventListeners() {
    // Esc key closes modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('open')) {
        const closeBtn = this.modal.querySelector('.product-modal__close');
        if (closeBtn) closeBtn.click();
      }
    });

    // Resize recalculates active glider positioning
    window.addEventListener('resize', () => {
      const activeTab = this.tabsContainer.querySelector('.catalog-tab.active');
      this.positionGlider(activeTab);
    }, { passive: true });
  }

  openModal(productId) {
    const product = MEDICAL_PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const productImages = product.images || [product.image];
    const hasThumbnails = productImages.length > 1;

    let thumbnailsHtml = '';
    if (hasThumbnails) {
      thumbnailsHtml = `
        <div class="product-modal__thumbnails">
          ${productImages.map((imgSrc, idx) => `
            <div class="product-modal__thumb-wrap ${idx === 0 ? 'active' : ''}" 
                 onclick="document.getElementById('modal-main-img').src='${imgSrc}'; this.parentElement.querySelectorAll('.product-modal__thumb-wrap').forEach(t=>t.classList.remove('active')); this.classList.add('active');">
              <img src="${imgSrc}" class="product-modal__thumb" alt="${product.title} View ${idx + 1}">
            </div>
          `).join('')}
        </div>
      `;
    }

    this.modal.innerHTML = `
      <div class="product-modal__backdrop"></div>
      <div class="product-modal__content">
        <button class="product-modal__close" aria-label="Close modal">&times;</button>
        <div class="product-modal__body">
          <div class="product-modal__img-column">
            <div class="product-modal__img-wrap">
              <img id="modal-main-img" src="${product.image}" alt="${product.title}" class="product-modal__img">
            </div>
            ${thumbnailsHtml}
          </div>
          <div class="product-modal__details-column">
            <span class="product-modal__category">${product.category}</span>
            <h2 class="product-modal__title">${product.title}</h2>
            
            <div class="product-modal__tabs">
              <button class="product-modal__tab-btn active" onclick="switchModalTab(this, 'overview')">Overview</button>
              <button class="product-modal__tab-btn" onclick="switchModalTab(this, 'features')">Features</button>
              <button class="product-modal__tab-btn" onclick="switchModalTab(this, 'specs')">Specifications</button>
            </div>

            <div class="product-modal__tab-pane active" id="pane-overview">
              <p class="product-modal__desc">${product.description}</p>
            </div>

            <div class="product-modal__tab-pane" id="pane-features">
              <ul class="product-modal__features-list">
                ${(product.features || [
                  "Manufactured in an ISO Class 7 & 8 certified cleanroom facility.",
                  "Precision-moulded with 100% medical-grade, biocompatible polymers.",
                  "Excellent dimensional consistency for secure assembly and connection.",
                  "Tested rigorously for leak-proof performance and flow accuracy.",
                  "Complies fully with ISO 13485 and global medical standards."
                ]).map(f => `<li>${f}</li>`).join('')}
              </ul>
            </div>

            <div class="product-modal__tab-pane" id="pane-specs">
              <table class="product-modal__specs-table">
                <tbody>
                  ${Object.entries(product.specs).map(([label, val]) => `
                    <tr>
                      <td class="product-modal__specs-label">${label}</td>
                      <td class="product-modal__specs-value">${val}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <div class="product-modal__actions">
              <button class="btn btn--outline btn--md product-modal__close-btn">Close</button>
              <a href="contact.html?product=${encodeURIComponent(product.title)}" class="btn btn--primary btn--md">Enquire Now</a>
            </div>
          </div>
        </div>
      </div>
    `;

    this.modal.style.display = 'flex';
    this.modal.offsetHeight;
    this.modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    const closeBtn = this.modal.querySelector('.product-modal__close');
    const closeBtnAlt = this.modal.querySelector('.product-modal__close-btn');
    const backdrop = this.modal.querySelector('.product-modal__backdrop');

    const closeModalFn = () => {
      this.modal.classList.remove('open');
      document.body.style.overflow = '';
      setTimeout(() => {
        this.modal.style.display = 'none';
        this.modal.innerHTML = '';
      }, 300);
    };

    closeBtn.addEventListener('click', closeModalFn);
    closeBtnAlt.addEventListener('click', closeModalFn);
    backdrop.addEventListener('click', closeModalFn);
  }
}

// ── Tab Switcher Helper ────────────────────────────────────
window.switchModalTab = function(btnElement, paneId) {
  const container = btnElement.parentElement;
  container.querySelectorAll('.product-modal__tab-btn').forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');

  const modalContent = container.closest('.product-modal__content');
  modalContent.querySelectorAll('.product-modal__tab-pane').forEach(pane => pane.classList.remove('active'));
  
  const targetPane = modalContent.querySelector(`#pane-${paneId}`);
  if (targetPane) {
    targetPane.classList.add('active');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.productShowcaseInstance = new ProductShowcase();
});
