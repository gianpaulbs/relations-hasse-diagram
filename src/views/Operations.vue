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
              <p>El conjunto <i>A</i> puede estar formado por tan solo de 4 a 7 elementos. 
              Además, los elementos válidos pueden ser letras o números, más no símbolos.
              Por favor, seleccione el número de elementos que debería tener el conjunto: </p>
              <form class="row g-3">
                <div class="col-md-1">
                  <input
                    type="text"
                    class="form-control"
                    onkeydown="if (['Space'].includes(arguments[0].code)) return false;"
                    v-model="e"
                  >                                                                                                                                                               
                </div>
                <div class="col-md-2">
                  <select class="form-select" v-model="n_elements">
                    <option value="" disabled>N° de elementos</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </select>
                </div>
                <div class="col-md-9">
                  <button 
                    type="button" 
                    class="btn btn-primary me-2" 
                    @click="buildSet_A(option.manual)"
                    :disabled="A.length == 7 || n_elements == ''"  
                  >Añadir</button>
                  <button 
                    type="button" 
                    class="btn btn-success"
                    :disabled="n_elements == ''" 
                    @click="buildSet_A(option.automatic)">Generar elementos</button>
                </div>
              </form>
            </section>

            <section>
              <div style="margin-top: 25px; margin-bottom: 15px; font-size: 20px; text-align: center;">
                {
                <template v-for="(element, index) in A">
                  <span class="badge bg-dark" :key="index">{{ element }}</span>
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
          <button 
            class="accordion-button collapsed" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#flush-collapseTwo" 
            aria-expanded="false" 
            aria-controls="flush-collapseTwo">
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
                <template v-for="(element, index) in AxA" >
                  ( <span class="badge bg-dark" :key="index">{{ element[0] }} ; {{ element[1] }}</span> )
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
            3. Generamos una relación&nbsp;<i>a R b</i>
          </button>
        </h2>
        <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            <section>
              <p>Por favor, seleccione elementos del producto cartesiano <b><i>AxA</i></b> para formar <b><i>a R b</i></b> 
                o defina un número de pares ordenados y deje que el sistema genere los elementos.
              </p>
              <!-- <p>El sistema permite seleccionar elementos manualmente y de manera aleatoria a partir del producto cartesiano <b><i>AxA</i></b> para poder formar <b><i>a R b</i></b>. -->
                 <!-- Esto lo hace dinámicamente cada que el producto cartesiano cambie en el contenido del conjunto o mediante el botón <i class="bi bi-arrow-clockwise"></i><b> Refrescar</b>. -->
              
              <form class="row g-3">
                <div class="col-md-2">
                  <input
                    type="number"
                    v-model="n_pairs"
                    placeholder="N° de pares ordenados"
                    class="form-control"
                  >                                                                                                                                                               
                </div>
                <div class="col-md-10">
                  <button
                    type="button"
                    class="btn btn-success"
                    :disabled="n_pairs == ''"
                    @click="getRandomElementsFromAxA"
                  >
                    Generar elementos
                  </button>
                </div>
              </form>
            </section>

            <section>
              <!-- Producto cartesiano AxA -->
              <div style="margin-top: 20px; margin-bottom: 15px; font-size: 20px; text-align: center;">
                {
                  <template v-for="(element, index) in AxA">
                    ( <span
                        :class="changeColorIfPressed(element, tmp_aRa)"
                        style="cursor: pointer"
                        @click="getElementFromAxA(element)"
                        :key="index"
                      >{{ element[0] }} ; {{ element[1] }}</span> )
                    <template v-if="index != AxA.length - 1"> ; </template>
                  </template>
                }
              </div>

              <hr>

              <div style="font-size: 18px; text-align: center">
              Pares ordenados seleccionados:
                {
                  <template v-for="(element, index) in tmp_aRa">
                  ( <span
                      class="badge bg-secondary" :key="index">{{ element[0] }} ; {{ element[1] }}</span> )
                    <template v-if="index != tmp_aRa.length - 1"> ; </template>
                  </template>
                }
              </div>

              <div style="margin-top: 25px; text-align: center;">
                <button class="btn btn-danger me-2" @click="clearRelation">
                  <i class="bi bi-arrow-clockwise"></i> Limpiar
                </button>
                <button 
                  class="btn btn-primary collapsed"
                  type="button" 
                  data-bs-toggle="collapse" 
                  data-bs-target="#flush-collapseFour" 
                  aria-expanded="false" 
                  aria-controls="flush-collapseFour"
                  @click="buildSet_aRa"
                  :disabled="tmp_aRa.length == 0">
                  Guardar
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
            4. Clasificación de la relación &nbsp;<i>a R b</i>
          </button>
        </h2>
        <div id="flush-collapseFour" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            <section>
              <p>El sistema construye la matriz booleana M<sub>R</sub> y  clasifica a la relación en sus propiedades.</p>
            </section>

            <div style="margin-bottom: 25px; font-size: 20px; text-align: center;">
              {
              <template v-for="(element, index) in aRa" >
                ( <span class="badge bg-dark" :key="index">{{ element[0] }} ; {{ element[1] }}</span> )
                <template v-if="index != aRa.length - 1"> ; </template>
              </template>
              }
            </div>

            <div class="row">
              <div class="col-sm-6" style="margin-bottom: 20px; font-size: 27px; text-align: center;">
                <span v-html="stringMatrix"></span>
              </div>
              <div class="col-sm-6">
                <ul class="list-group">
                  <li 
                    class="list-group-item"
                    :style="'background-color: ' + m.color"
                    v-for="(m, index) in msg"
                    :key="index">
                    <i>{{ m.text }}</i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="accordion-item" v-if="checkEquivalence === 3">
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
                <template v-for="(element, index) in aRa">
                  ( <span class="badge bg-dark" :key="index">{{ element[0] }} ; {{ element[1] }}</span> )
                  <template v-if="index != aRa.length - 1"> ; </template>
                </template>
                }
              </div>
            </section>

            
            <div class="row" style="margin-top: 20px;">
              <div class="col-sm-6" style="margin-bottom: 20px; font-size: 23px; text-align: center;">
                Clases de equivalencia
                <ul>
                  <li class="list-group-item" v-for="(c, i) in eqClasses" :key="i">
                    [{{ c.class }}] =
                    <template v-if="c.set.length == 0">∅</template>
                    <template v-else>
                      {
                      <template v-for="(s, j) in c.set">
                        <span :key="j">{{ s }} </span><template v-if="c.set.length - 1 != j">, </template>
                      </template>
                      }
                    </template>
                  </li>
                </ul>
              </div>
              <div class="col-sm-6" style="margin-bottom: 20px; font-size: 23px; text-align: center;">
                Conjunto cociente
                <div>

                  {
                  <template v-for="(element, index) in quotientSet">
                    <span class="badge bg-secondary" :key="index">{{ element }} </span>
                    <template v-if="index != quotientSet.length - 1"> ; </template>
                  </template>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="checkPartialOrder === 3">
      <div style="margin-bottom: 20px; font-size: 23px; text-align: center;">
        Diagrama de Hasse
      </div>
      <network ref="network" :nodes="nodes" :edges="edges" :options="options"></network>
    </div>
  </div>
</template>
<script>
import { matrix, row, column } from 'mathjs';
import { Network, DataSet } from 'vue2vis';
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
      tmp_aRa: [],
      aRa: [],
      msg: [],
      n_elements: "",
      n_pairs: "",
      indexFromTmpR: null,
      eqClasses: [],
      quotientSet: [],
      checkEquivalence: 0,
      checkPartialOrder: 0,
      boolMatrix: matrix(),
      hasseMatrix: [],
      stringMatrix: "",
      e: '',
      nodes: new DataSet(),
      edges: new DataSet(),
      options: {
        width: '100%',
        height: '600px',
        nodes: {
          shape: "dot"
        },
        edges: {
          width: 2,
        },
        layout: {
          hierarchical: {
            direction: 'DU',
            sortMethod: 'directed'
          }
        }
      }
    }
  },
  components: {
    'network': Network
  },
  watch: {
    'A' () {
      if (this.A.length >= 4 && this.A.length <= 7) {
        this.buildSet_AxA();
      }
    },
  },
  methods: {
    buildSet_A(isAutomatic) {
      if (isAutomatic) {
        this.addAutomatic();
        return;
      }

      this.addManual();
      this.tmp_aRa = [];
      this.aRa = [];
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
      this.aRa = this.tmp_aRa;
      // this.aRa = [];
      // let nR = getRandom(1, this.AxA.length);

      // for (let i = 0; i < nR; i++) {
      //   this.aRa.push(this.AxA[getRandom(0, (this.AxA.length) - 1)]);
      // }

      // /* Eliminamos elementos repetidos y convertimos nuevamente a arreglo */
      this.drawMatrix();
      this.buildQuotiend_Set();
    },

    getElementFromAxA(e) {
      if (this.existInRelation(e, this.tmp_aRa)) {
        this.tmp_aRa.splice(this.indexFromTmpR, 1);
        return;
      }

      this.tmp_aRa.push(e);
    },

    getRandomElementsFromAxA() {
      this.tmp_aRa = [];

      while(true) {
        this.tmp_aRa.push(this.AxA[getRandom(0, this.AxA.length - 1)]);
        
        const dataSet = new Set(this.tmp_aRa);
        this.tmp_aRa = [...dataSet];

        if (this.tmp_aRa.length == this.n_pairs) break;
      }
    },

    buildQuotiend_Set() {
      this.eqClasses = [];
      this.quotientSet = [];

      let elementsClasses = [];
      let elementsQuotient = [];

      /* Generar las clases de equivalencia del conjunto A */
      for (let i = 0; i < this.A.length; i++) {
        for (let j = 0; j < this.aRa.length; j++) {
          if (this.aRa[j][1] == this.A[i]) {
            elementsClasses.push(this.aRa[j][0]);
          }
        }

        const dataSet = new Set(elementsClasses);
        const fixDataSet = [...dataSet].sort();

        this.eqClasses.push({
          'class': this.A[i],
          'set': fixDataSet
        });

        /* Voy añadiendo los elementos a mi conjunto cociente */
        if (elementsQuotient.length > 0) {
          if (elementsQuotient.find(elem => JSON.stringify(elem) === JSON.stringify(fixDataSet)))
            console.log('No hago nada');
          else
            elementsQuotient.push(fixDataSet);
        }
        else {
          elementsQuotient.push(fixDataSet);
        }

        elementsClasses = [];
      }

      this.quotientSet = elementsQuotient;
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
      this.checkPartialOrder = 0;
      this.msg = [
        { color: '', text: 'La relación no es reflexiva.' },
        { color: '', text: 'La relación no es irreflexiva.' },
        { color: '', text: 'La relación no es simétrica.' },
        { color: '', text: 'La relación no es asimétrica.' },
        { color: '', text: 'La relación no es antisimétrica.' },
        { color: '', text: 'La relación no es transitiva.' },
        { color: '', text: 'La relación no es de equivalencia.' },
        { color: '', text: 'La relación no es de orden parcial.' },
      ];

      if (isReflexive(this.boolMatrix)) {
        this.msg[0].color = '#d8f8e1';
        this.msg[0].text = 'La relación es reflexiva.';
        this.checkEquivalence++;
        this.checkPartialOrder++;
      }

      if (isIrreflexive(this.boolMatrix)) {
        this.msg[1].color = '#d8f8e1';
        this.msg[1].text = 'La relación es irreflexiva.';
      }

      if (isSymmetric(this.boolMatrix)) {
        this.msg[2].color = '#d8f8e1';
        this.msg[2].text = 'La relación es simétrica.';
        this.checkEquivalence++;
      }
        
      if (isAsymmetric(this.boolMatrix)) {
        this.msg[3].color = '#d8f8e1';
        this.msg[3].text = 'La relación es asimétrica.';
      }

      if (isAntiSymmetric(this.boolMatrix)) {
        this.msg[4].color = '#d8f8e1';
        this.msg[4].text = 'La relación es antisimétrica.';
        this.checkPartialOrder++;
      }

      if (isTransitive(this.boolMatrix)) {
        this.msg[5].color = '#d8f8e1';
        this.msg[5].text = 'La relación es transitiva.';
        this.checkEquivalence++;
        this.checkPartialOrder++;
      }

      if (isEquivalence(this.checkEquivalence)) {
        this.msg[6].color = '#d8f8e1';
        this.msg[6].text = 'La relación es de equivalencia.';
      }

      if (isPartialOrder(this.checkPartialOrder)) {
        this.msg[7].color = '#d8f8e1';
        this.msg[7].text = 'La relación es de orden parcial.';
        this.drawHasseDiagram();
      }
    },

    drawHasseDiagram() {
      /* Reiniciamos para cada diagrama que queramos construir */
      this.nodes.add([]);
      this.edges.add([]);

      this.buildMatrixForHD();

      /* Definimos los nodos */
      let arrNds = [];

      for (let i = 0; i < this.A.length; i++) {
        let nds = {
          'id': this.A[i],
          'label': 'Nodo ' + this.A[i]
        };

        arrNds.push(nds);
      }

      this.nodes.add(arrNds);

      /* Definimos las aristas */
      for (let i = 0; i < this.hasseMatrix.length; i++) {
        for (let j = 0; j < this.hasseMatrix.length; j++) {
          if (this.hasseMatrix[i][j] === 1) {
            this.edges.add({
              from: this.A[i],
              to: this.A[j]
            });
          }
        }
      }
      
    },

    buildMatrixForHD() {
      let m1 = this.boolMatrix._data;

      /* Toda la diagonal lo pasamos a valores de 0 para eliminar la reflexividad */
      for (let i = 0; i < m1.length; i++) {
        for (let j = 0; j < m1.length; j++) {
          if (i === j)
            m1[i][j] = 0;
        }
      }

      /* Producto booleano */
      let tmpMatrix = matrix(m1);
      let r = [], c = [];
      let line = [], rcuadrado = [];
      let mlength = tmpMatrix.size()[0];
      let value = 0;

      for (let i = 0; i < mlength; i++) {
        r = row(tmpMatrix, i)._data;

        for (let j = 0; j < mlength; j++) {
          c = column(tmpMatrix, j)._data;

          for (let k = 0; k < mlength; k++) {
            value = r[0][k] * c[k][0];
            if (value) {
              break;
            }
          }
          
          line.push(value);
          value = 0;
        }

        rcuadrado.push(line);
        line = [];
      }

      /* Eliminar los unos de M1 que coincidan en M2 */
      for (let i = 0; i < rcuadrado.length; i++) {
        for (let j = 0; j < mlength; j++) {
          if (tmpMatrix._data[i][j] == 1 && rcuadrado[i][j] == 1 && tmpMatrix._data[i][j] == rcuadrado[i][j])
            tmpMatrix._data[i][j] = 0;
        }
      }

      this.hasseMatrix = tmpMatrix._data;
      console.log(this.hasseMatrix);
    },

    addManual() {
      if (this.A.length == 7 || this.A.length == this.n_elements) return;

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
      this.A = [];

      while(true) {
        if (getRandom(0, 1))
          this.A.push(getRandom(0, 20));
        else 
          this.A.push(String.fromCharCode(getRandom(97, 122)));

        const dataSet = new Set(this.A);
        this.A = [...dataSet];

        if (this.A.length == this.n_elements) break;
      }
    },

    existInRelation(element, relation) {
      for (let i = 0; i < relation.length; i++) {
        if (relation[i][0] == element[0] && relation[i][1] == element[1]) {
          this.indexFromTmpR = i;
          return true;
        } 
      }

      return false;
    },

    changeColorIfPressed(element) {
      let badgeClass = "badge bg-dark";

      if (this.existInRelation(element, this.tmp_aRa))
        badgeClass = "badge bg-primary";

      return badgeClass;
    },

    clearSet() {
      this.A = [];
      this.n_elements = "";
      this.n_pairs = "";
      this.AxA = [];
      this.tmp_aRa = [];
      this.aRa = [];
      this.eqClasses = [];
    },

    clearRelation() {
      this.tmp_aRa = [];
      this.n_pairs = "";
    }
  }
}
</script>