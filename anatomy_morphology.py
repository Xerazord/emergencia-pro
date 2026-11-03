#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Módulo de Morfologia, Anatomia de Superfície e Miologia Canônica — Corpo Humano Pardo (Fitzpatrick IV)
Proporções canônicas humanas de 8 cabeças (Norma Frontalis em Posição Anatômica Padrão).
Referência visual estrita: modelo muscular tridimensional canônico.

Contém:
1. Paleta cutânea e gradientes volumétricos tridimensionais (Pardo Dourado / Warm Golden Fitzpatrick IV).
2. Traçados vetoriais de alta fidelidade em curvas cúbicas de Bézier (M ... C ...) para cada segmento:
   - cabeca (crânio ovóide, zigomáticos, mandíbula esculpida, mento, orelhas, olhos, nariz, lábios)
   - pescoco (esternocleidomastoideos convergentes, fossa supraesternal, cartilagem tireóidea, trapézio)
   - torax (clavículas sinuosas reais, acrômio, deltoides arredondados, peitorais com relevo e mamilos, arcos costais)
   - abdome (reto abdominal orgânico com 6-8 gomos curvos, linha alba, cicatriz umbilical, cristas ilíacas, prega inguinal)
   - membros-superiores (bíceps braquial, fossa cubital, braquiorradial proeminente, mãos com 5 dedos anatômicos)
   - membros-inferiores (quadríceps com vasto medial em gota, patela, gastrocnêmio assimétrico, maléolos, pés a 10-15°)
3. Suporte completo a seletores :hover e scripts para transparência da pele e revelação de órgãos internos.
"""

import html
import os
import xml.etree.ElementTree as ET

# Linha Mediana Sagital e Dimensões Canônicas da Prancha Anatômica
CANVAS_WIDTH = 1200
CANVAS_HEIGHT = 1500
CX = 600  # Centro simétrico (Plano Mediano Sagital)

# Paleta Cromática Fitzpatrick IV (Pardo Amarelado / Dourado Caloroso)
COLOR_PALETTE = {
    "skin_deep_shadow": "#4A260F",
    "skin_shadow": "#6E3E1C",
    "skin_contour": "#8B5228",
    "skin_mid_warm": "#B47B49",
    "skin_base_golden": "#CA925E",
    "skin_light_golden": "#DCAB78",
    "skin_highlight": "#F0C89C",
    "areola": "#7C4520",
    "nipple": "#5C2F12",
    "muscle_shadow_stroke": "rgba(74, 38, 15, 0.45)",
    "muscle_highlight_stroke": "rgba(245, 210, 165, 0.55)",
    "accent_cyan": "#38BDF8",
    "accent_cyan_glow": "rgba(56, 189, 248, 0.8)",
}

# ==============================================================================
# GRADIENTES VOLUMÉTRICOS FITZPATRICK IV
# ==============================================================================
GRADIENTS_XML = f'''
    <!-- Fundo de Cockpit Médico Noturno -->
    <radialGradient id="cockpitDarkBg" cx="50%" cy="42%" r="68%">
      <stop offset="0%" stop-color="#111827"/>
      <stop offset="55%" stop-color="#090E1A"/>
      <stop offset="100%" stop-color="#03060C"/>
    </radialGradient>

    <!-- Pele Parda com Subtom Dourado/Amarelado (Fitzpatrick IV — Base Principal) -->
    <linearGradient id="skinGoldenPardo" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="{COLOR_PALETTE['skin_shadow']}"/>
      <stop offset="14%" stop-color="{COLOR_PALETTE['skin_contour']}"/>
      <stop offset="32%" stop-color="{COLOR_PALETTE['skin_base_golden']}"/>
      <stop offset="50%" stop-color="{COLOR_PALETTE['skin_light_golden']}"/>
      <stop offset="68%" stop-color="{COLOR_PALETTE['skin_base_golden']}"/>
      <stop offset="86%" stop-color="{COLOR_PALETTE['skin_contour']}"/>
      <stop offset="100%" stop-color="{COLOR_PALETTE['skin_shadow']}"/>
    </linearGradient>

    <!-- Volume Esférico da Cabeça e Crânio -->
    <radialGradient id="skinGoldenPardoHead" cx="50%" cy="36%" r="62%">
      <stop offset="0%" stop-color="{COLOR_PALETTE['skin_highlight']}"/>
      <stop offset="30%" stop-color="{COLOR_PALETTE['skin_light_golden']}"/>
      <stop offset="65%" stop-color="{COLOR_PALETTE['skin_base_golden']}"/>
      <stop offset="88%" stop-color="{COLOR_PALETTE['skin_contour']}"/>
      <stop offset="100%" stop-color="{COLOR_PALETTE['skin_shadow']}"/>
    </radialGradient>

    <!-- Volume Cilíndrico do Tronco (Tórax e Abdome) -->
    <linearGradient id="skinGoldenPardoTorso" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="{COLOR_PALETTE['skin_deep_shadow']}"/>
      <stop offset="12%" stop-color="{COLOR_PALETTE['skin_contour']}"/>
      <stop offset="35%" stop-color="{COLOR_PALETTE['skin_base_golden']}"/>
      <stop offset="50%" stop-color="{COLOR_PALETTE['skin_light_golden']}"/>
      <stop offset="65%" stop-color="{COLOR_PALETTE['skin_base_golden']}"/>
      <stop offset="88%" stop-color="{COLOR_PALETTE['skin_contour']}"/>
      <stop offset="100%" stop-color="{COLOR_PALETTE['skin_deep_shadow']}"/>
    </linearGradient>

    <!-- Volume das Coxas e Pernas -->
    <linearGradient id="skinGoldenLeg" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="{COLOR_PALETTE['skin_contour']}"/>
      <stop offset="25%" stop-color="{COLOR_PALETTE['skin_base_golden']}"/>
      <stop offset="50%" stop-color="{COLOR_PALETTE['skin_light_golden']}"/>
      <stop offset="75%" stop-color="{COLOR_PALETTE['skin_base_golden']}"/>
      <stop offset="100%" stop-color="{COLOR_PALETTE['skin_contour']}"/>
    </linearGradient>

    <!-- Gradientes de Órgãos Nobres Internos (Modo Hover / Transparência) -->
    <radialGradient id="brainGrad" cx="50%" cy="38%" r="60%">
      <stop offset="0%" stop-color="#FCE7F3"/>
      <stop offset="50%" stop-color="#F472B6"/>
      <stop offset="85%" stop-color="#DB2777"/>
      <stop offset="100%" stop-color="#831843"/>
    </radialGradient>

    <radialGradient id="heartGrad" cx="42%" cy="36%" r="62%">
      <stop offset="0%" stop-color="#FCA5A5"/>
      <stop offset="35%" stop-color="#EF4444"/>
      <stop offset="75%" stop-color="#B91C1C"/>
      <stop offset="100%" stop-color="#450A0A"/>
    </radialGradient>

    <radialGradient id="lungGrad" cx="55%" cy="38%" r="65%">
      <stop offset="0%" stop-color="#F9A8D4"/>
      <stop offset="45%" stop-color="#EC4899"/>
      <stop offset="80%" stop-color="#BE185D"/>
      <stop offset="100%" stop-color="#700732"/>
    </radialGradient>

    <radialGradient id="liverGrad" cx="35%" cy="32%" r="65%">
      <stop offset="0%" stop-color="#D97706"/>
      <stop offset="55%" stop-color="#92400E"/>
      <stop offset="100%" stop-color="#451A03"/>
    </radialGradient>

    <radialGradient id="stomachGrad" cx="45%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FDBA74"/>
      <stop offset="55%" stop-color="#EA580C"/>
      <stop offset="100%" stop-color="#7C2D12"/>
    </radialGradient>

    <radialGradient id="kidneyGrad" cx="45%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#EF4444"/>
      <stop offset="65%" stop-color="#991B1B"/>
      <stop offset="100%" stop-color="#450A0A"/>
    </radialGradient>

    <linearGradient id="boneGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#B8A995"/>
      <stop offset="35%" stop-color="#EBE3D5"/>
      <stop offset="65%" stop-color="#F8F5EE"/>
      <stop offset="100%" stop-color="#B8A995"/>
    </linearGradient>

    <filter id="cardGlowShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000000" flood-opacity="0.88"/>
    </filter>
'''

# ==============================================================================
# SEGMENTO 1: CABEÇA & CRÂNIO (Norma Frontalis Anatômica)
# ==============================================================================
HEAD_SKIN_PATH = (
    f"M {CX},58 "
    # Calvária esquerda (curva parietal)
    f"C {CX-34},58 {CX-56},72 {CX-64},94 "
    # Região temporal e fossa temporal
    f"C {CX-68},106 {CX-65},118 {CX-62},130 "
    # Arco Zigomático (maçã do rosto bem demarcada)
    f"C {CX-66},140 {CX-68},152 {CX-64},164 "
    # Ângulo da Mandíbula (Gonion definido)
    f"C {CX-60},176 {CX-52},192 {CX-42},205 "
    # Ramo e corpo mandibular convergindo para o queixo (Mentum pronunciado)
    f"C {CX-32},215 {CX-20},222 {CX-11},223 "
    # Borda inferior do mento (queixo masculino atlético firme)
    f"C {CX-5},224 {CX+5},224 {CX+11},223 "
    # Ascensão pelo ramo mandibular direito
    f"C {CX+20},222 {CX+32},215 {CX+42},205 "
    # Gonion direito
    f"C {CX+52},192 {CX+60},176 {CX+64},164 "
    # Arco zigomático direito
    f"C {CX+68},152 {CX+66},140 {CX+62},130 "
    # Região temporal direita
    f"C {CX+65},118 {CX+68},106 {CX+64},94 "
    # Calvária direita fechando no vértex
    f"C {CX+56},72 {CX+34},58 {CX},58 Z"
)

HEAD_RELIEFS_XML = f'''
    <!-- Orelhas Anatômicas (Posicionadas entre arco superciliar e base nasal) -->
    <!-- Orelha Esquerda (Viewer Left) -->
    <path d="M {CX-62},126 C {CX-74},124 {CX-79},138 {CX-76},152 C {CX-73},162 {CX-66},168 {CX-60},166" 
          fill="url(#skinGoldenPardoHead)" stroke="{COLOR_PALETTE['skin_contour']}" stroke-width="1.6"/>
    <path d="M {CX-66},134 C {CX-73},136 {CX-74},148 {CX-68},154" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.2" opacity="0.6"/>
    <!-- Orelha Direita (Viewer Right) -->
    <path d="M {CX+62},126 C {CX+74},124 {CX+79},138 {CX+76},152 C {CX+73},162 {CX+66},168 {CX+60},166" 
          fill="url(#skinGoldenPardoHead)" stroke="{COLOR_PALETTE['skin_contour']}" stroke-width="1.6"/>
    <path d="M {CX+66},134 C {CX+73},136 {CX+74},148 {CX+68},154" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.2" opacity="0.6"/>

    <!-- Relevo da Fronte e Sobrancelhas (Arcos Superciliares) -->
    <path d="M {CX-46},120 C {CX-36},115 {CX-22},115 {CX-12},121" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M {CX+12},121 C {CX+22},115 {CX+36},115 {CX+46},120" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.2" stroke-linecap="round"/>
    <!-- Glabela e Depressão Frontonasal -->
    <path d="M {CX-5},123 Q {CX},121 {CX+5},123" 
          fill="none" stroke="{COLOR_PALETTE['skin_shadow']}" stroke-width="1.2" opacity="0.5"/>

    <!-- Olhos Proporcionais em Posição Neutra (Fendas Palpebrais e Íris) -->
    <!-- Olho Esquerdo -->
    <path d="M {CX-11},134 C {CX-18},128 {CX-32},128 {CX-40},134 C {CX-32},139 {CX-18},139 {CX-11},134 Z" 
          fill="#FAF5EE" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.4"/>
    <circle cx="{CX-25}" cy="133.5" r="3.4" fill="#3D2314"/>
    <circle cx="{CX-25}" cy="133.5" r="1.4" fill="#110905"/>
    <circle cx="{CX-26}" cy="132.5" r="0.7" fill="#FFFFFF"/>
    <path d="M {CX-42},133 C {CX-34},125 {CX-16},125 {CX-9},133" 
          fill="none" stroke="{COLOR_PALETTE['skin_contour']}" stroke-width="1.1" opacity="0.7"/>

    <!-- Olho Direito -->
    <path d="M {CX+11},134 C {CX+18},128 {CX+32},128 {CX+40},134 C {CX+32},139 {CX+18},139 {CX+11},134 Z" 
          fill="#FAF5EE" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.4"/>
    <circle cx="{CX+25}" cy="133.5" r="3.4" fill="#3D2314"/>
    <circle cx="{CX+25}" cy="133.5" r="1.4" fill="#110905"/>
    <circle cx="{CX+24}" cy="132.5" r="0.7" fill="#FFFFFF"/>
    <path d="M {CX+42},133 C {CX+34},125 {CX+16},125 {CX+9},133" 
          fill="none" stroke="{COLOR_PALETTE['skin_contour']}" stroke-width="1.1" opacity="0.7"/>

    <!-- Nariz Humano Realista (Ponte, Dorso, Ápice, Asas e Narinas) -->
    <path d="M {CX-4},128 L {CX-4},154 C {CX-10},157 {CX-12},164 {CX-7},166 C {CX-3},168 {CX-1},168 {CX},168" 
          fill="none" stroke="{COLOR_PALETTE['skin_contour']}" stroke-width="1.3"/>
    <path d="M {CX+4},128 L {CX+4},154 C {CX+10},157 {CX+12},164 {CX+7},166 C {CX+3},168 {CX+1},168 {CX},168" 
          fill="none" stroke="{COLOR_PALETTE['skin_contour']}" stroke-width="1.3"/>
    <!-- Narinas e Columela -->
    <ellipse cx="{CX-4.5}" cy="165.5" rx="1.6" ry="1.0" fill="{COLOR_PALETTE['skin_deep_shadow']}"/>
    <ellipse cx="{CX+4.5}" cy="165.5" rx="1.6" ry="1.0" fill="{COLOR_PALETTE['skin_deep_shadow']}"/>
    <!-- Iluminação Dorsal do Nariz -->
    <line x1="{CX}" y1="130" x2="{CX}" y2="162" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="1.6" stroke-linecap="round" opacity="0.6"/>

    <!-- Filtro Labial e Lábios com Arco do Cupido -->
    <path d="M {CX-3},168 L {CX-3},176 M {CX+3},168 L {CX+3},176" 
          stroke="{COLOR_PALETTE['skin_contour']}" stroke-width="1.0" opacity="0.5"/>
    <!-- Lábio Superior -->
    <path d="M {CX-18},179 C {CX-11},177 {CX-5},175 {CX},177 C {CX+5},175 {CX+11},177 {CX+18},179 C {CX+12},183 {CX+4},182 {CX},181 C {CX-4},182 {CX-12},183 {CX-18},179 Z" 
          fill="#A45838" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.2"/>
    <!-- Lábio Inferior -->
    <path d="M {CX-16},180 C {CX-10},181.5 {CX-4},182 {CX},182 C {CX+4},182 {CX+10},181.5 {CX+16},180 C {CX+13},190 {CX-13},190 {CX-16},180 Z" 
          fill="#B66542" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.2"/>
    <ellipse cx="{CX}" cy="184.5" rx="5" ry="1.8" fill="{COLOR_PALETTE['skin_highlight']}" opacity="0.4"/>

    <!-- Sulco Mentolabial e Queixo Pronunciado (Mento) -->
    <path d="M {CX-11},196 Q {CX},198 {CX+11},196" 
          fill="none" stroke="{COLOR_PALETTE['skin_contour']}" stroke-width="1.4" opacity="0.6"/>
    <!-- Coxim Adiposo do Mento -->
    <path d="M {CX-14},206 C {CX-8},214 {CX+8},214 {CX+14},206" 
          fill="none" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="2.2" opacity="0.45"/>
    <path d="M {CX-20},208 C {CX-10},218 {CX+10},218 {CX+20},208" 
          fill="none" stroke="{COLOR_PALETTE['skin_contour']}" stroke-width="1.2" opacity="0.5"/>
'''

# ==============================================================================
# SEGMENTO 2: PESCOÇO (Trígono Cervical e Musculatura)
# ==============================================================================
NECK_SKIN_PATH = (
    f"M {CX-42},205 "
    # Descida lateral esquerda (borda do trapézio e fáscia cervical)
    f"C {CX-45},220 {CX-50},238 {CX-58},258 "
    # Base inferior esquerda (encontro com clavícula e manúbrio)
    f"L {CX-12},266 "
    f"L {CX},268 "
    f"L {CX+12},266 "
    f"L {CX+58},258 "
    # Subida lateral direita
    f"C {CX+50},238 {CX+45},220 {CX+42},205 "
    # Submandibular fechando na base da cabeça
    f"C {CX+24},218 {CX-24},218 {CX-42},205 Z"
)

NECK_RELIEFS_XML = f'''
    <!-- Cartilagem Tireóidea (Pomo de Adão / Proeminência Laríngea) -->
    <path d="M {CX-7},232 L {CX},236 L {CX+7},232 L {CX+6},242 L {CX-6},242 Z" 
          fill="{COLOR_PALETTE['skin_mid_warm']}" stroke="{COLOR_PALETTE['skin_contour']}" stroke-width="1.2"/>
    <circle cx="{CX}" cy="235" r="1.5" fill="{COLOR_PALETTE['skin_highlight']}" opacity="0.7"/>

    <!-- Músculos Esternocleidomastoideos (SCM) Convergindo em V para o Manúbrio -->
    <!-- SCM Esquerdo (Feixe Esternal e Clavicular) -->
    <path d="M {CX-45},210 C {CX-34},226 {CX-22},246 {CX-8},265" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M {CX-42},212 C {CX-32},228 {CX-20},248 {CX-6},264" 
          fill="none" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="1.6" stroke-linecap="round" opacity="0.6"/>
    <path d="M {CX-38},224 C {CX-34},236 {CX-28},248 {CX-22},263" 
          fill="none" stroke="{COLOR_PALETTE['skin_contour']}" stroke-width="1.4" opacity="0.5"/>

    <!-- SCM Direito (Feixe Esternal e Clavicular) -->
    <path d="M {CX+45},210 C {CX+34},226 {CX+22},246 {CX+8},265" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M {CX+42},212 C {CX+32},228 {CX+20},248 {CX+6},264" 
          fill="none" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="1.6" stroke-linecap="round" opacity="0.6"/>
    <path d="M {CX+38},224 C {CX+34},236 {CX+28},248 {CX+22},263" 
          fill="none" stroke="{COLOR_PALETTE['skin_contour']}" stroke-width="1.4" opacity="0.5"/>

    <!-- Fossa Supraesternal (Fossa Jugularis) no Manúbrio Esternal -->
    <path d="M {CX-10},264 C {CX-5},269 {CX+5},269 {CX+10},264" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.0"/>

    <!-- Relevo do Trapézio Descendente -->
    <path d="M {CX-46},218 C {CX-54},232 {CX-68},248 {CX-85},256" 
          fill="none" stroke="{COLOR_PALETTE['skin_contour']}" stroke-width="1.3" opacity="0.5"/>
    <path d="M {CX+46},218 C {CX+54},232 {CX+68},248 {CX+85},256" 
          fill="none" stroke="{COLOR_PALETTE['skin_contour']}" stroke-width="1.3" opacity="0.5"/>
'''

# ==============================================================================
# SEGMENTO 3: TÓRAX & CINTURA ESCAPULAR
# ==============================================================================
THORAX_SKIN_PATH = (
    f"M {CX-184},252 "
    # Clavícula esquerda (dupla curvatura em S clássica)
    f"C {CX-140},248 {CX-95},268 {CX-48},266 "
    f"C {CX-25},265 {CX-12},266 {CX},268 "
    # Clavícula direita (S-curve simétrica)
    f"C {CX+12},266 {CX+25},265 {CX+48},266 "
    f"C {CX+95},268 {CX+140},248 {CX+184},252 "
    # Acrômio e Deltoide direito
    f"C {CX+202},258 {CX+218},282 {CX+222},314 "
    f"C {CX+224},342 {CX+214},370 {CX+198},386 "
    # Prega axilar anterior e parede lateral do tórax direito (digitações serráteis)
    f"C {CX+182},392 {CX+168},405 {CX+158},422 "
    f"C {CX+148},440 {CX+140},458 {CX+136},474 "
    # Borda inferior do tórax (Margem Costal / Ângulo Infraesternal até apêndice xifoide)
    f"C {CX+102},460 {CX+62},435 {CX+18},424 "
    f"C {CX+8},422 {CX+2},420 {CX},420 "
    f"C {CX-2},420 {CX-8},422 {CX-18},424 "
    f"C {CX-62},435 {CX-102},460 {CX-136},474 "
    # Parede lateral esquerda e axila
    f"C {CX-140},458 {CX-148},440 {CX-158},422 "
    f"C {CX-168},405 {CX-182},392 {CX-198},386 "
    # Deltoide esquerdo
    f"C {CX-214},370 {CX-224},342 {CX-222},314 "
    f"C {CX-218},282 {CX-202},258 {CX-184},252 Z"
)

THORAX_RELIEFS_XML = f'''
    <!-- Clavículas Sinuosas Reais (Dupla Curvatura Óssea em S) -->
    <!-- Clavícula Esquerda -->
    <path d="M {CX-12},267 C {CX-42},264 {CX-98},266 {CX-142},252 C {CX-158},247 {CX-172},248 {CX-184},252" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M {CX-14},266 C {CX-44},263 {CX-96},265 {CX-140},251 C {CX-156},246 {CX-170},247 {CX-182},251" 
          fill="none" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="1.8" stroke-linecap="round" opacity="0.75"/>

    <!-- Clavícula Direita -->
    <path d="M {CX+12},267 C {CX+42},264 {CX+98},266 {CX+142},252 C {CX+158},247 {CX+172},248 {CX+184},252" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.6" stroke-linecap="round"/>
    <path d="M {CX+14},266 C {CX+44},263 {CX+96},265 {CX+140},251 C {CX+156},246 {CX+170},247 {CX+182},251" 
          fill="none" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="1.8" stroke-linecap="round" opacity="0.75"/>

    <!-- Sulco Mediano Anterior (Fissura Esternal / Depressão do Esterno) -->
    <line x1="{CX}" y1="268" x2="{CX}" y2="420" 
          stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.2" stroke-linecap="round"/>

    <!-- Músculos Peitorais Maiores (Fibras Claviculares, Esternocostais e Sulco Subpeitoral) -->
    <!-- Peitoral Esquerdo -->
    <path d="M {CX-12},382 C {CX-52},392 {CX-105},388 {CX-148},362 C {CX-158},352 {CX-165},340 {CX-168},326" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.8" stroke-linecap="round"/>
    <path d="M {CX-16},378 C {CX-54},387 {CX-102},384 {CX-144},358" 
          fill="none" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="2.0" opacity="0.55"/>
    <path d="M {CX-18},276 C {CX-60},282 {CX-110},298 {CX-152},318" 
          fill="none" stroke="{COLOR_PALETTE['skin_contour']}" stroke-width="1.4" opacity="0.45"/>
    <path d="M {CX-16},305 C {CX-65},314 {CX-115},328 {CX-155},338" 
          fill="none" stroke="{COLOR_PALETTE['skin_contour']}" stroke-width="1.3" opacity="0.4"/>

    <!-- Peitoral Direito -->
    <path d="M {CX+12},382 C {CX+52},392 {CX+105},388 {CX+148},362 C {CX+158},352 {CX+165},340 {CX+168},326" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.8" stroke-linecap="round"/>
    <path d="M {CX+16},378 C {CX+54},387 {CX+102},384 {CX+144},358" 
          fill="none" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="2.0" opacity="0.55"/>
    <path d="M {CX+18},276 C {CX+60},282 {CX+110},298 {CX+152},318" 
          fill="none" stroke="{COLOR_PALETTE['skin_contour']}" stroke-width="1.4" opacity="0.45"/>
    <path d="M {CX+16},305 C {CX+65},314 {CX+115},328 {CX+155},338" 
          fill="none" stroke="{COLOR_PALETTE['skin_contour']}" stroke-width="1.3" opacity="0.4"/>

    <!-- Mamilos e Complexos Aréolo-Papilares (Posicionados no 4º Espaço Intercostal) -->
    <!-- Mamilo Esquerdo -->
    <ellipse cx="{CX-84}" cy="360" rx="6.5" ry="5.5" fill="{COLOR_PALETTE['areola']}" opacity="0.8"/>
    <circle cx="{CX-84}" cy="360" r="2.4" fill="{COLOR_PALETTE['nipple']}"/>
    <!-- Mamilo Direito -->
    <ellipse cx="{CX+84}" cy="360" rx="6.5" ry="5.5" fill="{COLOR_PALETTE['areola']}" opacity="0.8"/>
    <circle cx="{CX+84}" cy="360" r="2.4" fill="{COLOR_PALETTE['nipple']}"/>

    <!-- Digitações do Músculo Serrátil Anterior (Costelas 5 a 8 em Leque Muscular) -->
    <!-- Lado Esquerdo -->
    <path d="M {CX-162},376 C {CX-150},382 {CX-136},388 {CX-128},398" fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.6" opacity="0.6"/>
    <path d="M {CX-156},398 C {CX-144},405 {CX-132},412 {CX-124},424" fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.6" opacity="0.6"/>
    <path d="M {CX-148},422 C {CX-138},430 {CX-128},438 {CX-120},450" fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.6" opacity="0.6"/>
    <!-- Lado Direito -->
    <path d="M {CX+162},376 C {CX+150},382 {CX+136},388 {CX+128},398" fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.6" opacity="0.6"/>
    <path d="M {CX+156},398 C {CX+144},405 {CX+132},412 {CX+124},424" fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.6" opacity="0.6"/>
    <path d="M {CX+148},422 C {CX+138},430 {CX+128},438 {CX+120},450" fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.6" opacity="0.6"/>

    <!-- Sulco Deltopeitoral e Inserção do Deltoide -->
    <path d="M {CX-142},252 C {CX-154},278 {CX-165},314 {CX-168},345" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.8" opacity="0.65"/>
    <path d="M {CX+142},252 C {CX+154},278 {CX+165},314 {CX+168},345" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.8" opacity="0.65"/>
'''

# ==============================================================================
# SEGMENTO 4: ABDOME & PELVE (Reto Abdominal Orgânico e Flancos)
# ==============================================================================
ABDOMEN_SKIN_PATH = (
    f"M {CX-136},474 "
    # Cintura esbelta e transição para o flanco
    f"C {CX-132},496 {CX-126},522 {CX-122},546 "
    # Curvatura anatômica da Crista Ilíaca esquerda
    f"C {CX-120},568 {CX-126},594 {CX-132},618 "
    # Sulco Inguinal esquerdo (Ligamento de Poupart / Cinturão de Apolo)
    f"C {CX-124},642 {CX-95},672 {CX-46},692 "
    # Sínfise púbica e arco inferior
    f"C {CX-25},698 {CX-10},700 {CX},700 "
    # Sulco Inguinal direito
    f"C {CX+10},700 {CX+25},698 {CX+46},692 "
    # Crista Ilíaca direita
    f"C {CX+95},672 {CX+124},642 {CX+132},618 "
    f"C {CX+126},594 {CX+120},568 {CX+122},546 "
    # Cintura direita
    f"C {CX+126},522 {CX+132},496 {CX+136},474 "
    # Margem Costal fechando no apêndice xifoide
    f"C {CX+102},460 {CX+62},435 {CX+18},424 "
    f"C {CX+8},422 {CX+2},420 {CX},420 "
    f"C {CX-2},420 {CX-8},422 {CX-18},424 "
    f"C {CX-62},435 {CX-102},460 {CX-136},474 Z"
)

ABDOMEN_RELIEFS_XML = f'''
    <!-- Linha Alba (Sulco Sagital Mediano Fisiológico) -->
    <path d="M {CX},420 C {CX-1},450 {CX-1},485 {CX},520 C {CX+1},540 {CX},580 {CX},675" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.4" stroke-linecap="round"/>

    <!-- Inscrições Tendíneas Orgânicas e Curvas (Tendinous Intersections dos Gomos) -->
    <!-- 1ª Inscrição Superior (Nível Epigástrico) -->
    <path d="M {CX-54},452 C {CX-34},457 {CX-14},455 {CX},452 C {CX+14},455 {CX+34},457 {CX+54},452" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M {CX-52},450 C {CX-34},455 {CX-14},453 {CX},450 C {CX+14},453 {CX+34},455 {CX+52},450" 
          fill="none" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="1.4" opacity="0.5"/>

    <!-- 2ª Inscrição Média (Nível Supraumbilical) -->
    <path d="M {CX-52},495 C {CX-32},500 {CX-14},498 {CX},495 C {CX+14},498 {CX+32},500 {CX+52},495" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M {CX-50},493 C {CX-32},498 {CX-14},496 {CX},493 C {CX+14},496 {CX+32},498 {CX+50},493" 
          fill="none" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="1.4" opacity="0.5"/>

    <!-- 3ª Inscrição Inferior (Nível Transumbilical Ondulado) -->
    <path d="M {CX-50},538 C {CX-30},543 {CX-12},540 {CX},538 C {CX+12},540 {CX+30},543 {CX+50},538" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.0" stroke-linecap="round"/>

    <!-- Linha Semilunar de Spighel (Bordas Laterais Convexas do Reto Abdominal) -->
    <!-- Linha de Spighel Esquerda -->
    <path d="M {CX-56},440 C {CX-60},472 {CX-58},515 {CX-52},560 C {CX-46},600 {CX-35},638 {CX-20},672" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.0" stroke-linecap="round"/>
    <path d="M {CX-54},442 C {CX-58},474 {CX-56},517 {CX-50},562" 
          fill="none" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="1.5" opacity="0.5"/>

    <!-- Linha de Spighel Direita -->
    <path d="M {CX+56},440 C {CX+60},472 {CX+58},515 {CX+52},560 C {CX+46},600 {CX+35},638 {CX+20},672" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.0" stroke-linecap="round"/>
    <path d="M {CX+54},442 C {CX+58},474 {CX+56},517 {CX+50},562" 
          fill="none" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="1.5" opacity="0.5"/>

    <!-- Bojos dos Gomos Musculares (Highlights Orgânicos Arredondados) -->
    <!-- Par Superior -->
    <ellipse cx="{CX-28}" cy="436" rx="16" ry="10" fill="{COLOR_PALETTE['skin_highlight']}" opacity="0.32"/>
    <ellipse cx="{CX+28}" cy="436" rx="16" ry="10" fill="{COLOR_PALETTE['skin_highlight']}" opacity="0.32"/>
    <!-- Par Médio -->
    <ellipse cx="{CX-28}" cy="476" rx="18" ry="12" fill="{COLOR_PALETTE['skin_highlight']}" opacity="0.36"/>
    <ellipse cx="{CX+28}" cy="476" rx="18" ry="12" fill="{COLOR_PALETTE['skin_highlight']}" opacity="0.36"/>
    <!-- Par Umbilical -->
    <ellipse cx="{CX-26}" cy="518" rx="16" ry="11" fill="{COLOR_PALETTE['skin_highlight']}" opacity="0.34"/>
    <ellipse cx="{CX+26}" cy="518" rx="16" ry="11" fill="{COLOR_PALETTE['skin_highlight']}" opacity="0.34"/>

    <!-- Cicatriz Umbilical Fisiológica (Prega Superior, Núcleo e Depressão) -->
    <ellipse cx="{CX}" cy="528" rx="4.5" ry="5.5" fill="{COLOR_PALETTE['skin_deep_shadow']}"/>
    <path d="M {CX-3.5},526 C {CX-2},523 {CX+2},523 {CX+3.5},526" 
          fill="none" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="1.4"/>
    <circle cx="{CX}" cy="528.5" r="1.8" fill="{COLOR_PALETTE['skin_deep_shadow']}"/>

    <!-- Cristas Ilíacas e Sulcos Inguinais (Apollo's Belt) -->
    <!-- Sulco Inguinal Esquerdo -->
    <path d="M {CX-124},595 C {CX-94},634 {CX-56},666 {CX-18},686" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M {CX-122},593 C {CX-92},632 {CX-54},664 {CX-16},684" 
          fill="none" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="1.6" opacity="0.55"/>

    <!-- Sulco Inguinal Direito -->
    <path d="M {CX+124},595 C {CX+94},634 {CX+56},666 {CX+18},686" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M {CX+122},593 C {CX+92},632 {CX+54},664 {CX+16},684" 
          fill="none" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="1.6" opacity="0.55"/>
'''

# ==============================================================================
# SEGMENTO 5: MEMBROS SUPERIORES (Posição Anatômica com Mãos de 5 Dedos)
# ==============================================================================
UPPER_LIMB_LEFT_PATH = (
    f"M {CX-184},252 "
    # Deltoide lateral arredondado potente
    f"C {CX-208},264 {CX-228},292 {CX-236},328 "
    f"C {CX-240},360 {CX-232},390 {CX-224},414 "
    # Braço lateral e tríceps
    f"C {CX-228},430 {CX-234},446 {CX-238},460 "
    # Antebraço lateral (Braquiorradial proeminente abaulado característico!)
    f"C {CX-254},482 {CX-276},514 {CX-280},546 "
    f"C {CX-282},574 {CX-274},604 {CX-264},628 "
    # Punho lateral (processo estiloide do rádio)
    f"C {CX-266},636 {CX-272},646 {CX-280},658 "
    # --- MÃO ABERTA EM SUPINAÇÃO (5 DEDOS PROPORCIONAIS) ---
    # Polegar (abduzido a 35° com eminência tênar potente)
    f"C {CX-292},670 {CX-308},684 {CX-316},698 "
    f"C {CX-320},706 {CX-315},715 {CX-306},715 "
    f"C {CX-298},715 {CX-290},706 {CX-284},694 "
    # Comissura interdigital do polegar
    f"C {CX-278},684 {CX-270},674 {CX-266},672 "
    # Dedo Indicador (II) com falanges articuladas
    f"C {CX-268},694 {CX-270},718 {CX-272},742 "
    f"C {CX-273},749 {CX-265},750 {CX-260},744 "
    f"C {CX-257},724 {CX-256},700 {CX-255},684 "
    # Dedo Médio (III - Dedo mais longo da mão)
    f"C {CX-254},708 {CX-253},734 {CX-252},762 "
    f"C {CX-251},770 {CX-243},770 {CX-241},762 "
    f"C {CX-239},736 {CX-239},708 {CX-239},684 "
    # Dedo Anelar (IV)
    f"C {CX-238},705 {CX-237},726 {CX-236},748 "
    f"C {CX-235},755 {CX-227},755 {CX-225},748 "
    f"C {CX-224},726 {CX-224},702 {CX-225},680 "
    # Dedo Mínimo (V - Mais curto, afilado)
    f"C {CX-223},696 {CX-221},712 {CX-219},728 "
    f"C {CX-217},734 {CX-211},734 {CX-211},726 "
    f"C {CX-211},708 {CX-212},686 {CX-213},666 "
    # Eminência Hipotênar e Punho medial (processo estiloide da ulna)
    f"C {CX-214},652 {CX-215},638 {CX-216},624 "
    # Antebraço medial (músculos flexores e pronador redondo)
    f"C {CX-210},594 {CX-200},558 {CX-196},524 "
    f"C {CX-192},490 {CX-196},464 {CX-202},446 "
    # Fossa cubital anterior e Braço medial (Bíceps braquial fusiforme)
    f"C {CX-194},424 {CX-186},390 {CX-178},355 "
    f"C {CX-170},320 {CX-166},286 {CX-168},264 "
    # Fechamento na axila e acrômio
    f"L {CX-184},252 Z"
)

UPPER_LIMB_RIGHT_PATH = (
    f"M {CX+184},252 "
    # Deltoide lateral direito
    f"C {CX+208},264 {CX+228},292 {CX+236},328 "
    f"C {CX+240},360 {CX+232},390 {CX+224},414 "
    # Braço lateral e tríceps
    f"C {CX+228},430 {CX+234},446 {CX+238},460 "
    # Antebraço lateral (Braquiorradial)
    f"C {CX+254},482 {CX+276},514 {CX+280},546 "
    f"C {CX+282},574 {CX+274},604 {CX+264},628 "
    # Punho lateral
    f"C {CX+266},636 {CX+272},646 {CX+280},658 "
    # --- MÃO DIREITA ABERTA EM SUPINAÇÃO ---
    # Polegar direito
    f"C {CX+292},670 {CX+308},684 {CX+316},698 "
    f"C {CX+320},706 {CX+315},715 {CX+306},715 "
    f"C {CX+298},715 {CX+290},706 {CX+284},694 "
    f"C {CX+278},684 {CX+270},674 {CX+266},672 "
    # Indicador direito (II)
    f"C {CX+268},694 {CX+270},718 {CX+272},742 "
    f"C {CX+273},749 {CX+265},750 {CX+260},744 "
    f"C {CX+257},724 {CX+256},700 {CX+255},684 "
    # Médio direito (III)
    f"C {CX+254},708 {CX+253},734 {CX+252},762 "
    f"C {CX+251},770 {CX+243},770 {CX+241},762 "
    f"C {CX+239},736 {CX+239},708 {CX+239},684 "
    # Anelar direito (IV)
    f"C {CX+238},705 {CX+237},726 {CX+236},748 "
    f"C {CX+235},755 {CX+227},755 {CX+225},748 "
    f"C {CX+224},726 {CX+224},702 {CX+225},680 "
    # Mínimo direito (V)
    f"C {CX+223},696 {CX+221},712 {CX+219},728 "
    f"C {CX+217},734 {CX+211},734 {CX+211},726 "
    f"C {CX+211},708 {CX+212},686 {CX+213},666 "
    # Hipotênar e punho medial
    f"C {CX+214},652 {CX+215},638 {CX+216},624 "
    # Antebraço medial
    f"C {CX+210},594 {CX+200},558 {CX+196},524 "
    f"C {CX+192},490 {CX+196},464 {CX+202},446 "
    # Bíceps e braço medial
    f"C {CX+194},424 {CX+186},390 {CX+178},355 "
    f"C {CX+170},320 {CX+166},286 {CX+168},264 "
    f"L {CX+184},252 Z"
)

UPPER_LIMBS_COMBINED_PATH = f"{UPPER_LIMB_LEFT_PATH} {UPPER_LIMB_RIGHT_PATH}"

UPPER_LIMBS_RELIEFS_XML = f'''
    <!-- Relevos dos Músculos dos Membros Superiores -->
    <!-- BRAÇO ESQUERDO (Viewer Left) -->
    <!-- Bojo do Deltoide Anterior e Médio -->
    <path d="M {CX-184},254 C {CX-205},275 {CX-218},310 {CX-210},352 C {CX-205},372 {CX-198},388 {CX-192},398" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M {CX-182},256 C {CX-202},276 {CX-214},310 {CX-206},350" 
          fill="none" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="1.8" opacity="0.6"/>

    <!-- Bíceps Braquial (Ventre Muscular Fusiforme e Sulcos Bicipitais) -->
    <path d="M {CX-186},332 C {CX-204},352 {CX-206},390 {CX-198},422" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.0" stroke-linecap="round"/>
    <path d="M {CX-184},334 C {CX-200},354 {CX-202},388 {CX-196},418" 
          fill="none" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="1.6" opacity="0.55"/>
    <ellipse cx="{CX-202}" cy="382" rx="11" ry="24" fill="{COLOR_PALETTE['skin_highlight']}" opacity="0.25"/>

    <!-- Fossa Cubital (Prega Anterior do Cotovelo com Aponeurose Bicipital) -->
    <path d="M {CX-226},444 Q {CX-214},452 {CX-204},446" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.8"/>

    <!-- Antebraço: Crista Muscular do Braquiorradial -->
    <path d="M {CX-232},454 C {CX-252},482 {CX-264},520 {CX-258},565 C {CX-254},595 {CX-248},615 {CX-244},626" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.0" stroke-linecap="round"/>
    <path d="M {CX-230},456 C {CX-248},484 {CX-260},520 {CX-254},562" 
          fill="none" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="1.8" opacity="0.5"/>

    <!-- Palmas e Falanges das Mãos (Sulcos Tenar, Hipotenar e Articulações) -->
    <path d="M {CX-272},648 C {CX-265},662 {CX-252},672 {CX-235},668" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.4" opacity="0.7"/>
    <path d="M {CX-234},668 C {CX-228},660 {CX-224},648 {CX-222},638" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.3" opacity="0.6"/>
    <!-- Pregas de Flexão dos Dedos -->
    <line x1="{CX-269}" y1="712" x2="{CX-263}" y2="712" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.2"/>
    <line x1="{CX-253}" y1="724" x2="{CX-247}" y2="724" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.2"/>
    <line x1="{CX-237}" y1="720" x2="{CX-231}" y2="720" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.2"/>
    <line x1="{CX-221}" y1="708" x2="{CX-217}" y2="708" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.2"/>

    <!-- BRAÇO DIREITO (Viewer Right) -->
    <path d="M {CX+184},254 C {CX+205},275 {CX+218},310 {CX+210},352 C {CX+205},372 {CX+198},388 {CX+192},398" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M {CX+182},256 C {CX+202},276 {CX+214},310 {CX+206},350" 
          fill="none" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="1.8" opacity="0.6"/>

    <path d="M {CX+186},332 C {CX+204},352 {CX+206},390 {CX+198},422" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.0" stroke-linecap="round"/>
    <path d="M {CX+184},334 C {CX+200},354 {CX+202},388 {CX+196},418" 
          fill="none" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="1.6" opacity="0.55"/>
    <ellipse cx="{CX+202}" cy="382" rx="11" ry="24" fill="{COLOR_PALETTE['skin_highlight']}" opacity="0.25"/>

    <path d="M {CX+226},444 Q {CX+214},452 {CX+204},446" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.8"/>

    <path d="M {CX+232},454 C {CX+252},482 {CX+264},520 {CX+258},565 C {CX+254},595 {CX+248},615 {CX+244},626" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.0" stroke-linecap="round"/>
    <path d="M {CX+230},456 C {CX+248},484 {CX+260},520 {CX+254},562" 
          fill="none" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="1.8" opacity="0.5"/>

    <path d="M {CX+272},648 C {CX+265},662 {CX+252},672 {CX+235},668" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.4" opacity="0.7"/>
    <path d="M {CX+234},668 C {CX+228},660 {CX+224},648 {CX+222},638" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.3" opacity="0.6"/>
    <line x1="{CX+269}" y1="712" x2="{CX+263}" y2="712" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.2"/>
    <line x1="{CX+253}" y1="724" x2="{CX+247}" y2="724" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.2"/>
    <line x1="{CX+237}" y1="720" x2="{CX+231}" y2="720" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.2"/>
    <line x1="{CX+221}" y1="708" x2="{CX+217}" y2="708" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.2"/>
'''

# ==============================================================================
# SEGMENTO 6: MEMBROS INFERIORES (Quadríceps com Gota, Patela, Gastrocnêmio, Pés)
# ==============================================================================
LOWER_LIMBS_SKIN_PATH = (
    f"M {CX-132},618 "
    # Trocanter maior e contorno lateral da coxa esquerda (Vasto Lateral potente)
    f"C {CX-144},654 {CX-146},702 {CX-144},750 "
    f"C {CX-142},798 {CX-134},846 {CX-124},894 "
    # Joelho lateral esquerdo
    f"C {CX-116},926 {CX-110},954 {CX-108},978 "
    # Perna esquerda - Contorno Lateral (Gastrocnêmio lateral proximal)
    f"C {CX-114},1008 {CX-118},1042 {CX-116},1074 "
    # Afilamento da perna esquerda em direção ao tornozelo
    f"C {CX-114},1106 {CX-106},1145 {CX-98},1184 "
    # Maléolo Lateral Esquerdo (CANON: O lateral é MAIS BAIXO que o medial!)
    f"C {CX-95},1208 {CX-93},1228 {CX-92},1242 "
    # --- PÉ ESQUERDO (Rotação Externa Fisiológica de 10-15° com 5 Artelhos) ---
    # Borda lateral do pé e calcâneo
    f"C {CX-93},1256 {CX-94},1270 {CX-92},1282 "
    # Dedo mínimo (V)
    f"C {CX-90},1292 {CX-84},1295 {CX-80},1290 "
    # Dedo IV
    f"C {CX-78},1298 {CX-72},1300 {CX-68},1294 "
    # Dedo III
    f"C {CX-66},1302 {CX-60},1304 {CX-56},1298 "
    # Dedo II
    f"C {CX-54},1305 {CX-48},1306 {CX-45},1298 "
    # Hálux (Grande artelho medial potente)
    f"C {CX-44},1308 {CX-36},1308 {CX-34},1300 "
    f"C {CX-33},1292 {CX-36},1282 {CX-38},1272 "
    # Arco Longitudinal Medial do pé esquerdo (Cava do pé)
    f"C {CX-40},1260 {CX-43},1248 {CX-46},1234 "
    # Maléolo Medial Esquerdo (CANON: O medial é MAIS ALTO que o lateral!)
    f"C {CX-47},1228 {CX-48},1222 {CX-47},1214 "
    # Canela e Gastrocnêmio Medial Esquerdo (CANON: Desce mais baixo e é mais bojudo!)
    f"C {CX-44},1180 {CX-36},1138 {CX-32},1095 "
    f"C {CX-28},1055 {CX-30},1016 {CX-38},984 "
    # Vasto Medial Esquerdo em Gota ("Teardrop" volumoso logo acima do joelho!)
    f"C {CX-44},970 {CX-48},952 {CX-44},934 "
    f"C {CX-38},914 {CX-34},888 {CX-32},856 "
    # Coxa medial interna esquerda (Grácil e Adutores) subindo ao períneo
    f"C {CX-30},820 {CX-24},772 {CX-16},718 "
    # Períneo e Cava do Crotch
    f"L {CX},700 "
    # Coxa medial interna direita (Adutores) descendo do períneo
    f"L {CX+16},718 "
    f"C {CX+24},772 {CX+30},820 {CX+32},856 "
    f"C {CX+34},888 {CX+38},914 {CX+44},934 "
    # Vasto Medial Direito em Gota
    f"C {CX+48},952 {CX+44},970 {CX+38},984 "
    # Gastrocnêmio Medial Direito (Bojudo e baixo)
    f"C {CX+30},1016 {CX+28},1055 {CX+32},1095 "
    f"C {CX+36},1138 {CX+44},1180 {CX+47},1214 "
    # Maléolo Medial Direito
    f"C {CX+48},1222 {CX+47},1228 {CX+46},1234 "
    # Arco Longitudinal Medial direito
    f"C {CX+43},1248 {CX+40},1260 {CX+38},1272 "
    # --- PÉ DIREITO (Espelho com Artelhos proporcionais) ---
    # Hálux direito
    f"C {CX+36},1282 {CX+33},1292 {CX+34},1300 "
    f"C {CX+36},1308 {CX+44},1308 {CX+45},1298 "
    # Dedo II direito
    f"C {CX+48},1306 {CX+54},1305 {CX+56},1298 "
    # Dedo III direito
    f"C {CX+60},1304 {CX+66},1302 {CX+68},1294 "
    # Dedo IV direito
    f"C {CX+72},1300 {CX+78},1298 {CX+80},1290 "
    # Dedo V direito
    f"C {CX+84},1295 {CX+90},1292 {CX+92},1282 "
    # Calcâneo e Maléolo Lateral Direito
    f"C {CX+94},1270 {CX+93},1256 {CX+92},1242 "
    # Perna lateral direita subindo
    f"C {CX+93},1228 {CX+95},1208 {CX+98},1184 "
    f"C {CX+106},1145 {CX+114},1106 {CX+116},1074 "
    f"C {CX+118},1042 {CX+114},1008 {CX+108},978 "
    # Joelho lateral direito
    f"C {CX+110},954 {CX+116},926 {CX+124},894 "
    # Coxa lateral direita (Vasto lateral potente)
    f"C {CX+134},846 {CX+142},798 {CX+144},750 "
    f"C {CX+146},702 {CX+144},654 {CX+132},618 Z"
)

LOWER_LIMBS_RELIEFS_XML = f'''
    <!-- Relevos Anatômicos dos Membros Inferiores -->
    <!-- QUADRÍCEPS FEMORAL ESQUERDO (Viewer Left) -->
    <!-- Reto Femoral (Cilindro central potente descendo a coxa) -->
    <path d="M {CX-82},705 C {CX-86},762 {CX-88},825 {CX-82},890" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.2" stroke-linecap="round"/>
    <ellipse cx="{CX-82}" cy="800" rx="14" ry="46" fill="{COLOR_PALETTE['skin_highlight']}" opacity="0.28"/>

    <!-- Vasto Lateral Esquerdo (Grande varredura convexa lateral) -->
    <path d="M {CX-136},730 C {CX-134},785 {CX-124},848 {CX-104},915" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.0" stroke-linecap="round"/>
    <ellipse cx="{CX-118}" cy="795" rx="12" ry="42" fill="{COLOR_PALETTE['skin_highlight']}" opacity="0.25"/>

    <!-- Vasto Medial Esquerdo ("Gota Muscular" volumosa sobre o joelho) -->
    <path d="M {CX-56},848 C {CX-48},882 {CX-48},924 {CX-58},952" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M {CX-54},850 C {CX-46},884 {CX-46},922 {CX-56},948" 
          fill="none" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="1.8" opacity="0.55"/>
    <ellipse cx="{CX-52}" cy="926" rx="9" ry="16" fill="{COLOR_PALETTE['skin_highlight']}" opacity="0.32"/>

    <!-- Joelho Esquerdo: Patela Anatômica e Ligamento Patelar -->
    <path d="M {CX-76},938 C {CX-66},937 {CX-63},944 {CX-64},953 C {CX-65},962 {CX-76},967 {CX-76},967 C {CX-76},967 {CX-87},962 {CX-88},953 C {CX-89},944 {CX-86},937 {CX-76},938 Z" 
          fill="{COLOR_PALETTE['skin_light_golden']}" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.8"/>
    <ellipse cx="{CX-76}" cy="948" rx="6" ry="4" fill="{COLOR_PALETTE['skin_highlight']}" opacity="0.6"/>
    <path d="M {CX-78},967 L {CX-78},994 M {CX-74},967 L {CX-74},994" 
          stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.8"/>
    <path d="M {CX-88},972 Q {CX-82},986 {CX-80},994" stroke="{COLOR_PALETTE['skin_contour']}" stroke-width="1.3" fill="none" opacity="0.6"/>
    <path d="M {CX-64},972 Q {CX-70},986 {CX-72},994" stroke="{COLOR_PALETTE['skin_contour']}" stroke-width="1.3" fill="none" opacity="0.6"/>

    <!-- Perna Esquerda: Crista Tibial Anterior e Relevo do Gastrocnêmio -->
    <path d="M {CX-76},996 C {CX-74},1044 {CX-70},1110 {CX-60},1188 C {CX-56},1204 {CX-52},1216 {CX-48},1222" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M {CX-74},998 C {CX-72},1046 {CX-68},1112 {CX-58},1186" 
          fill="none" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="1.8" opacity="0.6"/>
    <ellipse cx="{CX-48}" cy="1068" rx="10" ry="26" fill="{COLOR_PALETTE['skin_highlight']}" opacity="0.25"/>
    <ellipse cx="{CX-102}" cy="1042" rx="9" ry="20" fill="{COLOR_PALETTE['skin_highlight']}" opacity="0.22"/>

    <!-- Maléolos Esquerdo (Marcadores Anatômicos) -->
    <circle cx="{CX-48}" cy="1222" r="3.2" fill="{COLOR_PALETTE['skin_light_golden']}" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.2"/>
    <circle cx="{CX-92}" cy="1238" r="3.4" fill="{COLOR_PALETTE['skin_light_golden']}" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.2"/>

    <!-- Tendões Extensores no Dorso do Pé Esquerdo -->
    <path d="M {CX-54},1234 L {CX-40},1292 M {CX-60},1236 L {CX-50},1292 M {CX-66},1238 L {CX-60},1292 M {CX-72},1240 L {CX-70},1290" 
          stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="1.2" opacity="0.5"/>

    <!-- QUADRÍCEPS FEMORAL DIREITO (Viewer Right - Espelho Sagital Perfeito) -->
    <path d="M {CX+82},705 C {CX+86},762 {CX+88},825 {CX+82},890" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.2" stroke-linecap="round"/>
    <ellipse cx="{CX+82}" cy="800" rx="14" ry="46" fill="{COLOR_PALETTE['skin_highlight']}" opacity="0.28"/>

    <path d="M {CX+136},730 C {CX+134},785 {CX+124},848 {CX+104},915" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.0" stroke-linecap="round"/>
    <ellipse cx="{CX+118}" cy="795" rx="12" ry="42" fill="{COLOR_PALETTE['skin_highlight']}" opacity="0.25"/>

    <path d="M {CX+56},848 C {CX+48},882 {CX+48},924 {CX+58},952" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M {CX+54},850 C {CX+46},884 {CX+46},922 {CX+56},948" 
          fill="none" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="1.8" opacity="0.55"/>
    <ellipse cx="{CX+52}" cy="926" rx="9" ry="16" fill="{COLOR_PALETTE['skin_highlight']}" opacity="0.32"/>

    <!-- Joelho Direito -->
    <path d="M {CX+76},938 C {CX+66},937 {CX+63},944 {CX+64},953 C {CX+65},962 {CX+76},967 {CX+76},967 C {CX+76},967 {CX+87},962 {CX+88},953 C {CX+89},944 {CX+86},937 {CX+76},938 Z" 
          fill="{COLOR_PALETTE['skin_light_golden']}" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.8"/>
    <ellipse cx="{CX+76}" cy="948" rx="6" ry="4" fill="{COLOR_PALETTE['skin_highlight']}" opacity="0.6"/>
    <path d="M {CX+78},967 L {CX+78},994 M {CX+74},967 L {CX+74},994" 
          stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.8"/>
    <path d="M {CX+88},972 Q {CX+82},986 {CX+80},994" stroke="{COLOR_PALETTE['skin_contour']}" stroke-width="1.3" fill="none" opacity="0.6"/>
    <path d="M {CX+64},972 Q {CX+70},986 {CX+72},994" stroke="{COLOR_PALETTE['skin_contour']}" stroke-width="1.3" fill="none" opacity="0.6"/>

    <!-- Perna Direita -->
    <path d="M {CX+76},996 C {CX+74},1044 {CX+70},1110 {CX+60},1188 C {CX+56},1204 {CX+52},1216 {CX+48},1222" 
          fill="none" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M {CX+74},998 C {CX+72},1046 {CX+68},1112 {CX+58},1186" 
          fill="none" stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="1.8" opacity="0.6"/>
    <ellipse cx="{CX+48}" cy="1068" rx="10" ry="26" fill="{COLOR_PALETTE['skin_highlight']}" opacity="0.25"/>
    <ellipse cx="{CX+102}" cy="1042" rx="9" ry="20" fill="{COLOR_PALETTE['skin_highlight']}" opacity="0.22"/>

    <!-- Maléolos Direito -->
    <circle cx="{CX+48}" cy="1222" r="3.2" fill="{COLOR_PALETTE['skin_light_golden']}" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.2"/>
    <circle cx="{CX+92}" cy="1238" r="3.4" fill="{COLOR_PALETTE['skin_light_golden']}" stroke="{COLOR_PALETTE['skin_deep_shadow']}" stroke-width="1.2"/>

    <path d="M {CX+54},1234 L {CX+40},1292 M {CX+60},1236 L {CX+50},1292 M {CX+66},1238 L {CX+60},1292 M {CX+72},1240 L {CX+70},1290" 
          stroke="{COLOR_PALETTE['skin_highlight']}" stroke-width="1.2" opacity="0.5"/>
'''

# ==============================================================================
# DICIONÁRIO DE ESTRUTURAS E METADADOS POR SEGMENTO
# ==============================================================================
SEGMENT_DEFINITIONS = {
    "cabeca": {
        "id": "seg-head",
        "segment_key": "cabeca",
        "title": "CABEÇA & CRÂNIO",
        "subtitle": "Emergências Neurológicas & Neurocirúrgicas",
        "skin_fill": "url(#skinGoldenPardoHead)",
        "skin_path": HEAD_SKIN_PATH,
        "reliefs_xml": HEAD_RELIEFS_XML,
        "organs_xml": f'''
          <!-- Encéfalo Tridimensional -->
          <path d="M {CX-38},118 C {CX-42},84 {CX-22},68 {CX},68 C {CX+22},68 {CX+42},84 {CX+38},118 C {CX+36},138 {CX+24},150 {CX},154 C {CX-24},150 {CX-36},138 {CX-38},118 Z"
                fill="url(#brainGrad)" stroke="#9D174D" stroke-width="1.5"/>
          <path d="M {CX-26},98 Q {CX-12},90 {CX},100 Q {CX+12},90 {CX+26},98" fill="none" stroke="#F472B6" stroke-width="1.8"/>
          <path d="M {CX-30},116 Q {CX-10},108 {CX},120 Q {CX+10},108 {CX+30},116" fill="none" stroke="#F472B6" stroke-width="1.8"/>
          <!-- Polígono de Willis e Artérias Cerebrais -->
          <circle cx="{CX}" cy="144" r="5" fill="none" stroke="#EF4444" stroke-width="2"/>
          <path d="M {CX-5},144 L {CX-18},130 M {CX+5},144 L {CX+18},130 M {CX},139 L {CX},124" stroke="#EF4444" stroke-width="1.8" stroke-linecap="round"/>
        ''',
        "card_position": (CX + 85, 60),
        "card_indicator": (CX + 62, 115),
        "diseases": [
            ("AVC Isquêmico / AVE", "#patologia-ave"),
            ("HSA / Aneurisma Roto", "#patologia-hsa"),
            ("TCE & Hipertensão PIC", "#patologia-tce"),
            ("Cefaleia com Red Flags", "#patologia-cefaleia")
        ]
    },
    "pescoco": {
        "id": "seg-neck",
        "segment_key": "pescoco",
        "title": "PESCOÇO & CERVICAL",
        "subtitle": "Via Aérea Difícil & Vasos Nobres Cervicais",
        "skin_fill": "url(#skinGoldenPardo)",
        "skin_path": NECK_SKIN_PATH,
        "reliefs_xml": NECK_RELIEFS_XML,
        "organs_xml": f'''
          <!-- Coluna Cervical C3-C7 -->
          <g fill="url(#boneGrad)" stroke="#78716C" stroke-width="0.8">
            <rect x="{CX-12}" y="210" width="24" height="6" rx="2"/>
            <rect x="{CX-13}" y="218" width="26" height="6" rx="2"/>
            <rect x="{CX-14}" y="226" width="28" height="7" rx="2"/>
            <rect x="{CX-15}" y="235" width="30" height="7" rx="2"/>
            <rect x="{CX-16}" y="244" width="32" height="8" rx="2"/>
          </g>
          <!-- Laringe e Anéis Traqueais -->
          <path d="M {CX-8},212 L {CX},218 L {CX+8},212 L {CX+7},226 L {CX-7},226 Z" fill="#93C5FD" stroke="#3B82F6" stroke-width="1.2"/>
          <rect x="{CX-6}" y="228" width="12" height="30" fill="#60A5FA" opacity="0.6" stroke="#2563EB" stroke-width="1"/>
          <!-- Feixes Carotídeos / Jugulares -->
          <path d="M {CX-20},208 L {CX-24},262" stroke="#EF4444" stroke-width="3.6" stroke-linecap="round"/>
          <path d="M {CX-28},208 L {CX-34},262" stroke="#3B82F6" stroke-width="4.2" stroke-linecap="round"/>
          <path d="M {CX+20},208 L {CX+24},262" stroke="#EF4444" stroke-width="3.6" stroke-linecap="round"/>
          <path d="M {CX+28},208 L {CX+34},262" stroke="#3B82F6" stroke-width="4.2" stroke-linecap="round"/>
        ''',
        "card_position": (CX - 375, 175),
        "card_indicator": (CX - 54, 235),
        "diseases": [
            ("Obstrução de V.A.", "#patologia-via-aerea"),
            ("Dissecção Carotídea", "#patologia-disseccao-carotida"),
            ("Trauma Cervical (C-Spine)", "#patologia-trauma-cervical"),
            ("Edema de Glote / Anafilaxia", "#patologia-anafilaxia")
        ]
    },
    "torax": {
        "id": "seg-thorax",
        "segment_key": "torax",
        "title": "TÓRAX & CARDIORESPIRATÓRIO",
        "subtitle": "Síndromes Coronarianas, Grandes Vasos & Pleuropulmonares",
        "skin_fill": "url(#skinGoldenPardoTorso)",
        "skin_path": THORAX_SKIN_PATH,
        "reliefs_xml": THORAX_RELIEFS_XML,
        "organs_xml": f'''
          <!-- Pulmões Direito e Esquerdo -->
          <path d="M {CX-28},272 C {CX-48},262 {CX-85},274 {CX-98},306 C {CX-110},338 {CX-115},385 {CX-112},424 C {CX-90},416 {CX-55},414 {CX-24},424 C {CX-20},392 {CX-22},312 {CX-28},272 Z"
                fill="url(#lungGrad)" stroke="#700732" stroke-width="1.5"/>
          <path d="M {CX+28},272 C {CX+48},262 {CX+85},274 {CX+98},306 C {CX+110},338 {CX+115},385 {CX+112},424 C {CX+90},416 {CX+65},414 {CX+42},424 C {CX+35},410 {CX+52},382 {CX+45},352 C {CX+32},325 {CX+24},305 {CX+28},272 Z"
                fill="url(#lungGrad)" stroke="#700732" stroke-width="1.5"/>
          <!-- Traqueia Torácica -->
          <line x1="{CX}" y1="262" x2="{CX}" y2="300" stroke="#93C5FD" stroke-width="7" stroke-linecap="round"/>
          <path d="M {CX},300 L {CX-24},322 M {CX},300 L {CX+24},322" stroke="#93C5FD" stroke-width="5" stroke-linecap="round"/>
          <!-- Arco Aórtico e Troncos Braquiocefálicos -->
          <path d="M {CX+2},320 C {CX-4},294 {CX+6},282 {CX+18},288 C {CX+28},292 {CX+30},310 {CX+12},332" fill="none" stroke="#EF4444" stroke-width="10" stroke-linecap="round"/>
          <line x1="{CX-16}" y1="262" x2="{CX-16}" y2="320" stroke="#3B82F6" stroke-width="9" stroke-linecap="round"/>
          <!-- Coração (Ventrículos e Átrios) -->
          <path d="M {CX-20},324 C {CX-32},334 {CX-35},360 {CX-25},382 C {CX-16},398 {CX+14},406 {CX+36},402 C {CX+48},400 {CX+50},390 {CX+44},376 C {CX+38},358 {CX+36},336 {CX+24},324 C {CX+12},316 {CX-8},316 {CX-20},324 Z"
                fill="url(#heartGrad)" stroke="#450A0A" stroke-width="1.8"/>
          <!-- Costelas e Esterno Ósseo -->
          <g fill="none" stroke="url(#boneGrad)" stroke-width="4.2" stroke-linecap="round" opacity="0.6">
            <path d="M {CX-12},272 C {CX-50},266 {CX-82},278 {CX-88},294"/>
            <path d="M {CX+12},272 C {CX+50},266 {CX+82},278 {CX+88},294"/>
            <path d="M {CX-12},294 C {CX-60},290 {CX-98},306 {CX-102},324"/>
            <path d="M {CX+12},294 C {CX+60},290 {CX+98},306 {CX+102},324"/>
            <path d="M {CX-12},318 C {CX-68},316 {CX-106},336 {CX-108},356"/>
            <path d="M {CX+12},318 C {CX+68},316 {CX+106},336 {CX+108},356"/>
            <path d="M {CX-12},344 C {CX-72},346 {CX-110},368 {CX-110},390"/>
            <path d="M {CX+12},344 C {CX+72},346 {CX+110},368 {CX+110},390"/>
          </g>
          <rect x="{CX-8}" y="270" width="16" height="92" rx="3" fill="url(#boneGrad)" stroke="#78716C" stroke-width="1.2" opacity="0.8"/>
        ''',
        "card_position": (CX + 235, 270),
        "card_indicator": (CX + 145, 345),
        "diseases": [
            ("SCA / Infarto (IAM)", "#patologia-sca"),
            ("Dissecção Aguda Aorta", "#patologia-disseccao-aorta"),
            ("Embolia Pulmonar (TEP)", "#patologia-tep"),
            ("Pneumotórax Hipertensivo", "#patologia-pneumotorax"),
            ("Edema Agudo Pulmonar", "#patologia-edema-agudo")
        ]
    },
    "abdome": {
        "id": "seg-abdomen",
        "segment_key": "abdome",
        "title": "ABDOME & PELVE",
        "subtitle": "Abdome Agudo Cirúrgico, Clínico & Vascular",
        "skin_fill": "url(#skinGoldenPardoTorso)",
        "skin_path": ABDOMEN_SKIN_PATH,
        "reliefs_xml": ABDOMEN_RELIEFS_XML,
        "organs_xml": f'''
          <!-- Fígado e Vesícula Biliar -->
          <path d="M {CX-112},442 C {CX-108},430 {CX-55},428 {CX-16},440 C {CX+14},444 {CX+38},446 {CX+48},454 C {CX+50},460 {CX+42},468 {CX+28},474 C {CX+2},484 {CX-22},498 {CX-46},514 C {CX-72},528 {CX-100},536 {CX-110},524 C {CX-115},514 {CX-116},470 {CX-112},442 Z"
                fill="url(#liverGrad)" stroke="#451A03" stroke-width="1.5"/>
          <ellipse cx="{CX-42}" cy="514" rx="7" ry="10" fill="#84CC16" stroke="#365314" stroke-width="1.2"/>
          <!-- Estômago e Baço -->
          <path d="M {CX+10},448 C {CX+22},438 {CX+52},436 {CX+72},451 C {CX+88},466 {CX+88},502 {CX+66},524 C {CX+46},542 {CX+16},542 {CX-2},521 L {CX},506 C {CX+14},514 {CX+32},510 {CX+40},496 C {CX+45},482 {CX+32},466 {CX+10},456 Z"
                fill="url(#stomachGrad)" stroke="#9A3412" stroke-width="1.5"/>
          <ellipse cx="{CX+92}" cy="472" rx="12" ry="18" fill="#7E22CE" stroke="#3B0764" stroke-width="1.2"/>
          <!-- Rins Retroperitoneais e Ureteres -->
          <path d="M {CX-68},504 C {CX-84},500 {CX-92},511 {CX-92},531 C {CX-92},551 {CX-76},564 {CX-62},562 C {CX-52},560 {CX-52},536 {CX-58},522 Z"
                fill="url(#kidneyGrad)" stroke="#450A0A" stroke-width="1.4"/>
          <path d="M {CX+68},492 C {CX+84},488 {CX+92},499 {CX+92},519 C {CX+92},539 {CX+76},552 {CX+62},550 C {CX+52},548 {CX+52},524 {CX+58},510 Z"
                fill="url(#kidneyGrad)" stroke="#450A0A" stroke-width="1.4"/>
          <!-- Aorta Abdominal e VCI -->
          <line x1="{CX+6}" y1="424" x2="{CX+6}" y2="595" stroke="#EF4444" stroke-width="7.5"/>
          <line x1="{CX-8}" y1="424" x2="{CX-8}" y2="595" stroke="#3B82F6" stroke-width="8.5"/>
          <!-- Intestino Delgado e Cólon -->
          <path d="M {CX-78},640 C {CX-88},640 {CX-92},624 {CX-90},596 C {CX-88},572 {CX-86},548 {CX-82},530 C {CX-68},522 {CX-22},534 {CX+22},532 C {CX+68},522 {CX+80},528 {CX+82},548 C {CX+85},578 {CX+82},610 {CX+76},640 C {CX+68},660 {CX+40},655 {CX+20},650 C {CX+5},648 {CX},660 {CX},680"
                fill="none" stroke="#EA580C" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/>
          <!-- Bexiga Urinária -->
          <ellipse cx="{CX}" cy="665" rx="20" ry="15" fill="#EAB308" stroke="#854D0E" stroke-width="1.5"/>
        ''',
        "card_position": (CX - 485, 480),
        "card_indicator": (CX - 128, 550),
        "diseases": [
            ("Apendicite Aguda", "#patologia-apendicite"),
            ("Colecistite / Colangite", "#patologia-colecistite"),
            ("Pancreatite Aguda", "#patologia-pancreatite"),
            ("Isquemia Mesentérica", "#patologia-isquemia-mesenterica"),
            ("HDA / Varizes / Úlcera", "#patologia-hda"),
            ("Obstrução Intestinal", "#patologia-obstrucao-intestinal"),
            ("Aneurisma Aorta (AAA Roto)", "#patologia-aneurisma-aorta")
        ]
    },
    "membros-superiores": {
        "id": "seg-upper-limbs",
        "segment_key": "membros-superiores",
        "title": "MEMBROS SUPERIORES",
        "subtitle": "Trauma Osteoarticular, Isquemia Vascular & Partes Moles",
        "skin_fill": "url(#skinGoldenPardo)",
        "skin_path": UPPER_LIMBS_COMBINED_PATH,
        "reliefs_xml": UPPER_LIMBS_RELIEFS_XML,
        "organs_xml": f'''
          <!-- Esqueleto e Feixes dos Membros Superiores -->
          <!-- Braço Esquerdo (Viewer Left) -->
          <line x1="{CX-184}" y1="262" x2="{CX-224}" y2="440" stroke="url(#boneGrad)" stroke-width="14" stroke-linecap="round"/>
          <line x1="{CX-188}" y1="266" x2="{CX-220}" y2="438" stroke="#EF4444" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="{CX-182}" y1="270" x2="{CX-216}" y2="438" stroke="#3B82F6" stroke-width="4.0" stroke-linecap="round"/>
          <!-- Antebraço (Rádio e Ulna) -->
          <line x1="{CX-232}" y1="452" x2="{CX-272}" y2="618" stroke="url(#boneGrad)" stroke-width="8" stroke-linecap="round"/>
          <line x1="{CX-220}" y1="452" x2="{CX-256}" y2="618" stroke="url(#boneGrad)" stroke-width="8" stroke-linecap="round"/>
          <line x1="{CX-226}" y1="452" x2="{CX-264}" y2="618" stroke="#EF4444" stroke-width="2.8"/>
          <!-- Braço Direito (Viewer Right) -->
          <line x1="{CX+184}" y1="262" x2="{CX+224}" y2="440" stroke="url(#boneGrad)" stroke-width="14" stroke-linecap="round"/>
          <line x1="{CX+188}" y1="266" x2="{CX+220}" y2="438" stroke="#EF4444" stroke-width="3.5" stroke-linecap="round"/>
          <line x1="{CX+182}" y1="270" x2="{CX+216}" y2="438" stroke="#3B82F6" stroke-width="4.0" stroke-linecap="round"/>
          <line x1="{CX+232}" y1="452" x2="{CX+272}" y2="618" stroke="url(#boneGrad)" stroke-width="8" stroke-linecap="round"/>
          <line x1="{CX+220}" y1="452" x2="{CX+256}" y2="618" stroke="url(#boneGrad)" stroke-width="8" stroke-linecap="round"/>
          <line x1="{CX+226}" y1="452" x2="{CX+264}" y2="618" stroke="#EF4444" stroke-width="2.8"/>
        ''',
        "card_position": (CX + 245, 450),
        "card_indicator": (CX + 268, 545),
        "diseases": [
            ("Fraturas & Luxações MS", "#patologia-fraturas-ms"),
            ("Isquemia Aguda MS", "#patologia-oclusao-arterial-ms"),
            ("S. Compartimental", "#patologia-sindrome-compartimento"),
            ("Infecções da Mão / Tenossinovite", "#patologia-infeccao-mao")
        ]
    },
    "membros-inferiores": {
        "id": "seg-lower-limbs",
        "segment_key": "membros-inferiores",
        "title": "MEMBROS INFERIORES",
        "subtitle": "Vascular Agudo, Trauma & Partes Moles",
        "skin_fill": "url(#skinGoldenLeg)",
        "skin_path": LOWER_LIMBS_SKIN_PATH,
        "reliefs_xml": LOWER_LIMBS_RELIEFS_XML,
        "organs_xml": f'''
          <!-- Esqueleto e Feixes dos Membros Inferiores -->
          <!-- Coxa Esquerda (Fêmur e Vasos Femorais) -->
          <line x1="{CX-84}" y1="710" x2="{CX-76}" y2="938" stroke="url(#boneGrad)" stroke-width="18" stroke-linecap="round"/>
          <line x1="{CX-74}" y1="710" x2="{CX-68}" y2="938" stroke="#EF4444" stroke-width="4.6" stroke-linecap="round"/>
          <line x1="{CX-80}" y1="710" x2="{CX-72}" y2="938" stroke="#3B82F6" stroke-width="5.0" stroke-linecap="round"/>
          <circle cx="{CX-76}" cy="952" r="14" fill="url(#boneGrad)" stroke="#78716C" stroke-width="1.2"/>
          <!-- Perna Esquerda (Tíbia e Fíbula) -->
          <line x1="{CX-76}" y1="970" x2="{CX-58}" y2="1215" stroke="url(#boneGrad)" stroke-width="13" stroke-linecap="round"/>
          <line x1="{CX-94}" y1="980" x2="{CX-88}" y2="1215" stroke="url(#boneGrad)" stroke-width="6.5" stroke-linecap="round"/>
          <line x1="{CX-74}" y1="970" x2="{CX-56}" y2="1215" stroke="#EF4444" stroke-width="3.2"/>
          <line x1="{CX-78}" y1="970" x2="{CX-60}" y2="1215" stroke="#3B82F6" stroke-width="3.6"/>
          <!-- Coxa Direita -->
          <line x1="{CX+84}" y1="710" x2="{CX+76}" y2="938" stroke="url(#boneGrad)" stroke-width="18" stroke-linecap="round"/>
          <line x1="{CX+74}" y1="710" x2="{CX+68}" y2="938" stroke="#EF4444" stroke-width="4.6" stroke-linecap="round"/>
          <line x1="{CX+80}" y1="710" x2="{CX+72}" y2="938" stroke="#3B82F6" stroke-width="5.0" stroke-linecap="round"/>
          <circle cx="{CX+76}" cy="952" r="14" fill="url(#boneGrad)" stroke="#78716C" stroke-width="1.2"/>
          <!-- Perna Direita -->
          <line x1="{CX+76}" y1="970" x2="{CX+58}" y2="1215" stroke="url(#boneGrad)" stroke-width="13" stroke-linecap="round"/>
          <line x1="{CX+94}" y1="980" x2="{CX+88}" y2="1215" stroke="url(#boneGrad)" stroke-width="6.5" stroke-linecap="round"/>
          <line x1="{CX+74}" y1="970" x2="{CX+56}" y2="1215" stroke="#EF4444" stroke-width="3.2"/>
          <line x1="{CX+78}" y1="970" x2="{CX+60}" y2="1215" stroke="#3B82F6" stroke-width="3.6"/>
        ''',
        "card_position": (CX - 465, 930),
        "card_indicator": (CX - 114, 1020),
        "diseases": [
            ("TVP / Trombose Venosa", "#patologia-tvp"),
            ("Isquemia Aguda MI", "#patologia-oclusao-arterial-mi"),
            ("Celulite &amp; Erisipela", "#patologia-celulite-erisipela"),
            ("Fasciíte Necrosante", "#patologia-fasciite-necrosante"),
            ("Fratura de Fêmur / Pelve", "#patologia-fratura-femur")
        ]
    }
}

# ==============================================================================
# GERADOR DE CARDS DE PATOLOGIAS
# ==============================================================================
def render_hover_card(seg_info):
    card_x, card_y = seg_info["card_position"]
    ind_x, ind_y = seg_info["card_indicator"]
    title = html.escape(seg_info["title"])
    subtitle = html.escape(seg_info["subtitle"])
    diseases = seg_info["diseases"]

    btn_h = 26
    pad_top = 48
    row_gap = 6
    num_rows = (len(diseases) + 1) // 2
    if len(diseases) == 5:
        card_h = pad_top + (2 * (btn_h + row_gap)) + btn_h + 16
    else:
        card_h = pad_top + (num_rows * (btn_h + row_gap)) + 12

    card_w = 276
    is_left_side = card_x < CX

    xml = []
    xml.append(f'    <!-- Card Flutuante de Patologias: {title} -->')
    xml.append('    <g class="hover-card">')
    xml.append(f'      <path d="M {ind_x},{ind_y} L {card_x + (card_w if is_left_side else 0)},{card_y + 40}" stroke="#38BDF8" stroke-width="1.6" stroke-dasharray="4,3"/>')
    xml.append(f'      <circle cx="{ind_x}" cy="{ind_y}" r="4.5" fill="#38BDF8" stroke="#0C4A6E" stroke-width="1.5"/>')

    accent_bar_x = card_w - 5 if is_left_side else 0
    xml.append(f'      <g transform="translate({card_x}, {card_y})" filter="url(#cardGlowShadow)">')
    xml.append(f'        <rect width="{card_w}" height="{card_h}" rx="9" fill="#0B132B" stroke="#0284C7" stroke-width="1.8"/>')
    xml.append(f'        <rect x="{accent_bar_x}" width="5" height="{card_h}" rx="2.5" fill="#38BDF8"/>')
    xml.append(f'        <text x="16" y="24" class="card-title">{title}</text>')
    xml.append(f'        <text x="16" y="39" class="card-subtitle">{subtitle}</text>')

    for idx, (d_name, d_url) in enumerate(diseases):
        esc_name = html.escape(d_name)
        if len(diseases) == 5 and idx == 4:
            bx = 16
            by = pad_top + 2 * (btn_h + row_gap)
            bw = card_w - 32
        else:
            col = idx % 2
            row = idx // 2
            bx = 16 if col == 0 else 142
            by = pad_top + row * (btn_h + row_gap)
            bw = 118

        xml.append(f'''        <a href="{d_url}" class="path-btn" transform="translate({bx}, {by})">
          <rect width="{bw}" height="{btn_h}" rx="5"/>
          <text x="8" y="17">{esc_name}</text>
        </a>''')

    xml.append('      </g>')
    xml.append('    </g>')
    return "\n".join(xml)

# ==============================================================================
# COMPILADOR GERAL DO SVG
# ==============================================================================
def generate_canonical_body_svg():
    w, h = CANVAS_WIDTH, CANVAS_HEIGHT
    cx = CX

    svg = []
    svg.append(f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="100%" height="100%" id="clinicalBodyNavigator">
  <title>Atlas Anatômico Topográfico e Navegador Clínico — Corpo Humano Pardo Canônico</title>
  <desc>Morfologia humana realista baseada em proporções de 8 cabeças (Norma Frontalis). Corpo pardo dourado (Fitzpatrick IV) com camadas interativas de pele e órgãos nobres internos.</desc>

  <defs>
{GRADIENTS_XML}
  </defs>

  <style>
    text {{
      user-select: none;
      -webkit-user-select: none;
    }}

    .bg-grid {{
      stroke: #1E293B;
      stroke-width: 0.8;
      opacity: 0.35;
    }}

    .segment-group {{
      cursor: pointer;
    }}

    .skin-layer {{
      fill-opacity: 1.0;
      stroke: {COLOR_PALETTE['skin_contour']};
      stroke-width: 1.8;
      transition: fill-opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1),
                  stroke 0.28s cubic-bezier(0.4, 0, 0.2, 1),
                  stroke-width 0.28s cubic-bezier(0.4, 0, 0.2, 1),
                  filter 0.28s cubic-bezier(0.4, 0, 0.2, 1);
    }}

    .muscle-relief {{
      transition: opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1);
      pointer-events: none;
    }}

    .internal-organs {{
      pointer-events: none;
    }}

    .hover-card {{
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.26s cubic-bezier(0.4, 0, 0.2, 1),
                  transform 0.26s cubic-bezier(0.4, 0, 0.2, 1);
      transform: translateY(6px);
    }}

    .segment-group:hover .skin-layer {{
      fill-opacity: 0.16 !important;
      stroke: #38BDF8 !important;
      stroke-width: 2.8 !important;
      filter: drop-shadow(0 0 16px rgba(56, 189, 248, 0.8)) !important;
    }}

    .segment-group:hover .muscle-relief {{
      opacity: 0.25 !important;
    }}

    .segment-group:hover .hover-card {{
      opacity: 1 !important;
      pointer-events: auto !important;
      transform: translateY(0) !important;
    }}

    .path-btn {{
      cursor: pointer;
      text-decoration: none;
    }}
    .path-btn rect {{
      fill: #1E293B;
      stroke: #334155;
      stroke-width: 1.2;
      transition: fill 0.16s ease, stroke 0.16s ease;
    }}
    .path-btn text {{
      fill: #F8FAFC;
      font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      font-size: 11px;
      font-weight: 500;
    }}
    .path-btn:hover rect {{
      fill: #0284C7;
      stroke: #38BDF8;
    }}
    .path-btn:hover text {{
      fill: #FFFFFF;
      font-weight: 700;
    }}

    .card-title {{
      fill: #F8FAFC;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 13.5px;
      font-weight: 800;
      letter-spacing: 0.6px;
    }}
    .card-subtitle {{
      fill: #94A3B8;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 10.5px;
    }}
  </style>

  <!-- Fundo do Cockpit Noturno -->
  <rect width="{w}" height="{h}" fill="url(#cockpitDarkBg)"/>
  <g class="bg-grid">''')

    for gx in range(60, w, 60):
        svg.append(f'    <line x1="{gx}" y1="50" x2="{gx}" y2="{h-50}"/>')
    for gy in range(60, h, 60):
        svg.append(f'    <line x1="40" y1="{gy}" x2="{w-40}" y2="{gy}"/>')

    svg.append(f'''  </g>
  <line x1="{cx}" y1="50" x2="{cx}" y2="{h-60}" stroke="#334155" stroke-dasharray="6,4" stroke-width="1.2" opacity="0.6"/>

  <!-- TÍTULO SUPERIOR -->
  <g transform="translate({cx}, 38)" text-anchor="middle">
    <text fill="#F8FAFC" font-family="'Inter', system-ui, sans-serif" font-size="18" font-weight="800" letter-spacing="1.6">MENU TOPOGRÁFICO DE PATOLOGIAS CLÍNICAS</text>
    <text y="20" fill="#38BDF8" font-family="'Inter', system-ui, sans-serif" font-size="11.5" font-weight="500">Passe o cursor sobre os segmentos corpóreos para ativar a transparência e acessar os protocolos de emergência</text>
  </g>
''')

    segment_keys = ["cabeca", "pescoco", "torax", "abdome", "membros-superiores", "membros-inferiores"]

    for key in segment_keys:
        seg = SEGMENT_DEFINITIONS[key]
        svg.append(f'''
  <!-- ========================================================================= -->
  <!-- SEGMENTO: {seg['title']} -->
  <!-- ========================================================================= -->
  <g id="{seg['id']}" class="segment-group" data-segment="{seg['segment_key']}">
    <!-- Camada de Órgãos Nobres Internos (Revelada no Hover) -->
    <g class="internal-organs">
{seg['organs_xml']}
    </g>

    <!-- Camada de Pele Humana Parda Canônica (Opaca por padrão) -->
    <path class="skin-layer" fill="{seg['skin_fill']}" d="{seg['skin_path']}"/>

    <!-- Relevos Musculares, Ósseos e Faciais Realistas -->
    <g class="muscle-relief">
{seg['reliefs_xml']}
    </g>

    <!-- Menu Flutuante com Links Diretos para Protocolos de Emergência -->
{render_hover_card(seg)}
  </g>''')

    # Rodapé Técnico Informativo
    svg.append(f'''
  <!-- RODAPÉ TÉCNICO -->
  <g transform="translate({cx}, {h-32})" text-anchor="middle">
    <rect x="-420" y="-18" width="840" height="34" rx="6" fill="#0F172A" stroke="#1E293B" stroke-width="1.2"/>
    <circle cx="-365" cy="-1" r="5" fill="{COLOR_PALETTE['skin_base_golden']}"/>
    <text x="-352" y="3" fill="#E2E8F0" font-family="'Inter', sans-serif" font-size="11" text-anchor="start">Pele Parda Dourada (Opaca por padrão)</text>
    
    <circle cx="-70" cy="-1" r="5" fill="#38BDF8"/>
    <text x="-57" y="3" fill="#E2E8F0" font-family="'Inter', sans-serif" font-size="11" text-anchor="start">Hover: Ativa Transparência &amp; Revela Anatomia Interna</text>

    <circle cx="225" cy="-1" r="5" fill="#10B981"/>
    <text x="238" y="3" fill="#E2E8F0" font-family="'Inter', sans-serif" font-size="11" text-anchor="start">Links Diretos para Protocolos</text>
  </g>

</svg>
''')

    full_xml = "\n".join(svg)
    # Validação XML estrita
    ET.fromstring(full_xml.encode("utf-8"))
    return full_xml

if __name__ == "__main__":
    svg_data = generate_canonical_body_svg()
    destinations = [
        "/Users/mateustcandido/.gemini/antigravity/brain/05bd2d35-eaed-4a12-9810-353520433f3f/scratch/corpo_humano_navegador.svg",
        "/Users/mateustcandido/.gemini/antigravity/brain/05bd2d35-eaed-4a12-9810-353520433f3f/anatomia_corpo_humano.svg",
        "/Users/mateustcandido/Desktop/Emergency Text/corpo_humano_navegador.svg",
        "/Users/mateustcandido/Desktop/Emergency Text/anatomia_corpo_humano.svg"
    ]
    for d in destinations:
        try:
            with open(d, "w", encoding="utf-8") as fp:
                fp.write(svg_data)
            print(f"Salvo com sucesso: {d} ({len(svg_data.encode('utf-8'))} bytes)")
        except Exception as e:
            print(f"Erro ao salvar em {d}: {e}")
