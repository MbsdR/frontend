import {Component, OnInit} from '@angular/core';
import {WebSocketService} from './@core/service/webSocket/web-socket.service';
import Ajv, {JSONSchemaType} from 'ajv';
const ajv = new Ajv();

interface MyData {
  foo: number;
  bar?: string;
}

const schema: JSONSchemaType<MyData> = {
  type: 'object',
  properties: {
    foo: {type: 'integer'},
    bar: {type: 'string', nullable: true}
  },
  required: ['foo'],
  additionalProperties: false
};
@Component({
  selector: 'wisa-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./wisa.component.css'],
})
export class WisaComponent implements OnInit{
  title = 'Demonstrator';
  constructor(private service: WebSocketService ) {
  }

  ngOnInit(): void {

// validate is a type guard for MyData - type is inferred from schema type
    const validate = ajv.compile(schema);

// or, if you did not use type annotation for the schema,
// type parameter can be used to make it type guard:
// const validate = ajv.compile<MyData>(schema)

    const data = {
      foo: 1,
      bar: 'abc'
    };

    if (validate(data)) {
      // data is MyData here
      console.log(data.foo);
    } else {
      console.log(validate.errors);
    }


  }


}
