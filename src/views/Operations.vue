<template>
  <div class="container">
    <div class="accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            1. Creamos el conjunto&nbsp;<i>A</i>
          </button>
        </h2>
        <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            <section>
              <p>El conjunto <i>A</i> puede estar formado por tan solo de 4 a 7 elementos. Además, los elementos válidos pueden ser letras o números, más no símbolos.</p>
              <form class="row g-3">
                <div class="col-md-1">
                  <input
                    type="text"
                    class="form-control"
                    onkeydown="if (['Space'].includes(arguments[0].code)) return false;"
                    v-model="e"
                  >                                                                                                                                                                                   
                </div>
                <div class="col-md-11">
                  <button 
                    type="button" 
                    class="btn btn-primary me-2" 
                    @click="buildSet_A(option.manual)"
                    :disabled="A.length == 7"  
                  >Añadir</button>
                  <button type="button" class="btn btn-success" @click="buildSet_A(option.automatic)">Generar elementos</button>
                </div>
              </form>
            </section>

            <section>
              <div style="margin-top: 25px; margin-bottom: 15px; font-size: 20px; text-align: center;">
                {
                <template v-for="(element, index) in A" :key="index">
                  <span class="badge bg-dark">{{ element }}</span>
                  <template v-if="index != A.length - 1"> ; </template>
                </template>
                }
              </div>
              <div style="margin-top: 25px; text-align: center;">
                <button class="btn btn-danger" 
                  :disabled="A.length == 0"
                  @click="clearSet()">
                  <i class="bi bi-arrow-clockwise"></i> Limpiar
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
            2. Obtenemos el producto cartesiano&nbsp;<i>AxA</i>
          </button>
        </h2>
        <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            <section>
              <p>El sistema va calculando los elementos del producto cartesiano <i>AxA</i> dinámicamente a partir de los elementos del conjunto <i>A</i>.</p>
            </section>

            <section>
              <div style="margin-top: 20px; margin-bottom: 15px; font-size: 20px; text-align: center;">
                {
                <template v-for="(element, index) in AxA" :key="index">
                  ( <span class="badge bg-dark">{{ element[0] }} ; {{ element[1] }}</span> )
                  <template v-if="index != AxA.length - 1"> ; </template>
                </template>
                }
              </div>
            </section>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
            3. Generamos una relación&nbsp;<i>a R a</i>
          </button>
        </h2>
        <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            <section>
              <p>El sistema selecciona elementos aleatoriamente del producto cartesiano <i>AxA</i> para poder formar <i>a R a</i>. 
                 Esto lo hace dinámicamente cada que el producto cartesiano cambie en el contenido del conjunto o mediante el botón <i class="bi bi-arrow-clockwise"></i><b> Refrescar</b>.
              </p>
            </section>

            <section>
              <div style="margin-top: 20px; margin-bottom: 15px; font-size: 20px; text-align: center;">
                {
                <template v-for="(element, index) in aRa" :key="index">
                  ( <span class="badge bg-dark">{{ element[0] }} ; {{ element[1] }}</span> )
                  <template v-if="index != aRa.length - 1"> ; </template>
                </template>
                }
              </div>
              
              <div style="margin-top: 25px; text-align: center;">
                <button class="btn btn-primary" @click="buildSet_aRa">
                  <i class="bi bi-arrow-clockwise"></i> Refrescar
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
            4. Clasificación de la relación &nbsp;<i>a R a</i>
          </button>
        </h2>
        <div id="flush-collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            <section>
              <p>El sistema construye la matriz booleana M<sub>R</sub> y  clasifica a la relación en sus propiedades.</p>
            </section>

            <div class="row">
              <div class="col-sm-6" style="margin-bottom: 20px; font-size: 27px; text-align: center;">
                <span v-html="stringMatrix"></span>
              </div>
              <div class="col-sm-6">
                <ul class="list-group">
                  <li class="list-group-item" v-for="(m, index) in msg" :key="index"><i>{{ m }}</i></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
            Conjunto cociente de &nbsp;<i>A / R</i>
          </button>
        </h2>
        <div id="flush-collapseFive" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            <section>
              <p>El sistema construye las clases de equivalencia del conjunto <i>A</i> dada por la relación <i>R</i>. Luego, selecciona cada clase de equivalencia 
                y filtra a los conjuntos que no se repiten para acoplarlos en un último conjunto denominado <b>conjunto cociente.</b></p>
            </section>

            <section>
              Si tenemos la siguiente relación <i>R</i>:
              <div style="margin-top: 20px; margin-bottom: 15px; font-size: 20px; text-align: center;">
                {
                <template v-for="(element, index) in aRa" :key="index">
                  ( <span class="badge bg-dark">{{ element[0] }} ; {{ element[1] }}</span> )
                  <template v-if="index != aRa.length - 1"> ; </template>
                </template>
                }
              </div>
            </section>

            Calculamos sus clases de equivalencia y el conjunto cociente:
            
            <div class="row" style="margin-top: 20px;">
              <div class="col-sm-6" style="margin-bottom: 20px; font-size: 23px; text-align: center;">
                <ul>
                  <li class="list-group-item" v-for="(c, i) in eqClasses" :key="i">
                    [{{ c.class }}] =
                    <template v-if="c.set.length == 0">∅</template>
                    <template v-else>
                      {
                      <template v-for="(s, j) in c.set" :key="j">
                        {{ s }} <template v-if="c.set.length - 1 != j">, </template>
                      </template>
                      }
                    </template>
                  </li>
                </ul>
              </div>
              <div class="col-sm-6">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { matrix } from 'mathjs'; 
import { 
  getRandom, 
  isReflexive, 
  isIrreflexive, 
  isSymmetric,
  isAsymmetric,
  isAntiSymmetric,
  isTransitive,
  isEquivalence,
  isPartialOrder
} from '../assets/functions';

export default {
  data() {
    return {
      option: {
        manual: false,
        automatic: true
      },
      A: [],
      AxA: [],
      aRa: [],
      msg: [],
      eqClasses: [],
      checkEquivalence: 0,
      boolMatrix: matrix(),
      stringMatrix: "",
      e: ''
    }
  },
  watch: {
    'A' () {
      if (this.A.length >= 4 && this.A.length <= 7) {
        this.buildSet_AxA();
      }
    },

    'AxA' () {
      if (this.AxA.length > 0)
        this.buildSet_aRa();
    }
  },
  methods: {
    buildSet_A(isAutomatic) {
      if (isAutomatic) {
        this.addAutomatic();
        return;
      }

      this.addManual();
    },

    buildSet_AxA() {
      this.AxA = [];
      let pair = {};

      for (let i = 0; i < this.A.length; i++) {
        for (let j = 0; j < this.A.length; j++) {
          pair[0] = this.A[i];
          pair[1] = this.A[j];
          this.AxA.push(pair);
          pair = {};
        }
      }
    },

    buildSet_aRa() {
      this.aRa = [];
      let nR = getRandom(1, this.AxA.length);

      for (let i = 0; i < nR; i++) {
        this.aRa.push(this.AxA[getRandom(0, (this.AxA.length) - 1)]);
      }

      /* Eliminamos elementos repetidos y convertimos nuevamente a arreglo */
      const dataSet = new Set(this.aRa);
      this.aRa = [...dataSet];

      this.drawMatrix();
      this.buildQuotiend_Set();
    },

    buildQuotiend_Set() {
      /* Generar las clases de equivalencia del conjunto A */
      this.eqClasses = [];
      let elementsClasses = [];
      for (let i = 0; i < this.A.length; i++) {
        for (let j = 0; j < this.aRa.length; j++) {
          if (this.aRa[j][1] == this.A[i]) {
            elementsClasses.push(this.aRa[j][0]);
          }
        }

        const dataSet = new Set(elementsClasses);
        const fixDataSet = [...dataSet];

        this.eqClasses.push({
          'class': this.A[i],
          'set': fixDataSet 
        });

        elementsClasses = [];
      }

      console.log(this.eqClasses);
    },

    drawMatrix() {
      let line = [], tmp = [];
      let value = 0;
      let str = "";

      for (let i = 0; i < this.A.length; i++) {
        for (let j = 0; j < this.A.length; j++) {
          for(let k = 0; k < this.aRa.length; k++) {
            if (this.A[i] == this.aRa[k][0] && this.A[j] == this.aRa[k][1]) {
              value = 1; 
              break;
            }
          }
          
          line.push(value);
          if (value) value = 0;
        }
        
        tmp.push(line);
        line = [];
      }

      this.boolMatrix = matrix(tmp);

      for (let i = 0; i < tmp.length; i++) {
        str += "│&nbsp;&nbsp;&nbsp;";

        for (let j = 0; j < tmp.length; j++) {
          str += tmp[i][j] + "&nbsp;&nbsp;&nbsp;";
        }

        str += "│</br>"
      }

      this.stringMatrix = str;
      this.classifyRelation();
    },

    classifyRelation() {
      this.checkEquivalence = 0;
      let checkPartialOrder = 0;
      this.msg = [
        'La relación no es reflexiva.',
        'La relación no es irreflexiva.',
        'La relación no es simétrica.',
        'La relación no es asimétrica.',
        'La relación no es antisimétrica.',
        'La relación no es transitiva.',
        'La relación no es de equivalencia.',
        'La relación no es de orden parcial.'
      ];

      if (isReflexive(this.boolMatrix)) {
        this.msg[0] = 'La relación es reflexiva.';
        this.checkEquivalence++;
        checkPartialOrder++;
      }

      if (isIrreflexive(this.boolMatrix))
        this.msg[1] = 'La relación es irreflexiva.';

      if (isSymmetric(this.boolMatrix)) {
        this.msg[2] = 'La relación es simétrica.';
        this.checkEquivalence++;
      }
        
      if (isAsymmetric(this.boolMatrix))
        this.msg[3] = 'La relación es asimétrica.';

      if (isAntiSymmetric(this.boolMatrix)) {
        this.msg[4] = 'La relación es antisimétrica.';
        checkPartialOrder++;
      }

      if (isTransitive(this.boolMatrix)) {
        this.msg[5] = 'La relación es transitiva.';
        this.checkEquivalence++;
        checkPartialOrder++;
      }

      if (isEquivalence(this.checkEquivalence))
        this.msg[6] = 'La relación es de equivalencia.';

      if (isPartialOrder(checkPartialOrder))
        this.msg[7] = 'La relación es de orden parcial.';
    },

    addManual() {
      if (this.A.length == 7) return;

      /* Verificación para que el elemento en la caja no se repita */
      for (let i = 0; i < this.A.length; i++) {
        if (this.A[i] == this.e) return;
      }

      if (parseInt(this.e) >= 0) {
        this.A.push(parseInt(this.e));
        this.buildSet_AxA();
        return;
      }

      if ((/[a-zA-Z]/).test(this.e) && this.e.length == 1) {
        this.A.push(this.e);
        this.buildSet_AxA();
        return;
      }

      alert('¡Por favor, ingrese solo números o 1 letra!');
    },

    addAutomatic() {
      let n = getRandom(4, 7);
      this.A = [];

      for (let i = 0; i < n; i++) {
        if (getRandom(0, 1))
          this.A.push(getRandom(0, 20));
        else 
          this.A.push(String.fromCharCode(getRandom(97, 122)));
      }
    },

    clearSet() { 
      this.A = [];
      this.AxA = [];
      this.aRa = [];
      this.eqClasses = [];
    }
  }
}
</script>