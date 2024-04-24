import { PoolConnection } from "mysql2/promise";
import { IndicatorQuery } from "../queries/admin/indicator";

// NB: Visit Indicator.txt for definition descriptions

export class IndicatorRepository {
  private connection: PoolConnection;

  constructor(connection: PoolConnection) {
    this.connection = connection;
  }
  // IntermediateResut1
  //:::: 1A ::::::::://

  async IntermediateResult1A() {
    const q = IndicatorQuery.IntermediateResult1A();
    try {
      const [result]: any = await this.connection.execute(q);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async IntermediateResult1Awithdate(from: string, to: string) {
    const q = IndicatorQuery.IntermediateResult1Awithdate();
    try {
      const [result]: any = await this.connection.execute(q, [from, to]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async StateIntermediateResult1A(state: string) {
    const q = IndicatorQuery.StateIntermediateResult1A();
    try {
      const [result]: any = await this.connection.execute(q, [state]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async StateIntermediateResult1Awithdate(
    state: string,
    from: string,
    to: string
  ) {
    const q = IndicatorQuery.StateIntermediateResult1Awithdate();
    try {
      const [result]: any = await this.connection.execute(q, [state, from, to]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async LgaIntermediateResult1A(state: string, lga: string) {
    const q = IndicatorQuery.LgaIntermediateResult1A();
    try {
      const [result]: any = await this.connection.execute(q, [state, lga]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async LgaIntermediateResult1Awithdate(
    state: string,
    lga: string,
    from: string,
    to: string
  ) {
    const q = IndicatorQuery.LgaIntermediateResult1Awithdate();
    try {
      const [result]: any = await this.connection.execute(q, [
        state,
        lga,
        from,
        to,
      ]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult1A(
    state: string,
    healthfacility: string
  ) {
    const q = IndicatorQuery.HealthfacilityIntermediateResult1A();
    try {
      const [result]: any = await this.connection.execute(q, [
        state,
        healthfacility,
      ]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult1Awithdate(
    state: string,
    healthfacility: string,
    from: string,
    to: string
  ) {
    const q = IndicatorQuery.HealthfacilityIntermediateResult1Awithdate();
    try {
      const [result]: any = await this.connection.execute(q, [
        state,
        healthfacility,
        from,
        to,
      ]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  //::::: 1B :::::: //
  async IntermediateResult1B() {
    const q = IndicatorQuery.IntermediateResult1B();
    try {
      const [result]: any = await this.connection.execute(q);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async StateIntermediateResult1B(state: string) {
    const q = IndicatorQuery.StateIntermediateResult1B();
    try {
      const [result]: any = await this.connection.execute(q, [state]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async LgaIntermediateResult1B(state: string, lga: string) {
    const q = IndicatorQuery.IntermediateResult1B();
    try {
      const [result]: any = await this.connection.execute(q, [state, lga]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult1B(
    state: string,
    healthfacility: string
  ) {
    const q = IndicatorQuery.HealthfacilityIntermediateResult1B();
    try {
      const [result]: any = await this.connection.execute(q, [
        state,
        healthfacility,
      ]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  // ::::: 1C ::::://
  async IntermediateResult1C() {
    const q = IndicatorQuery.IntermediateResult1C();
    try {
      const [result]: any = await this.connection.execute(q);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async StateIntermediateResult1C(state: string) {
    const q = IndicatorQuery.StateIntermediateResult1C();
    try {
      const [result]: any = await this.connection.execute(q, [state]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async LgaIntermediateResult1C(state: string, lga: string) {
    const q = IndicatorQuery.IntermediateResult1C();
    try {
      const [result]: any = await this.connection.execute(q, [state, lga]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult1C(
    state: string,
    healthfacility: string
  ) {
    const q = IndicatorQuery.HealthfacilityIntermediateResult1C();
    try {
      const [result]: any = await this.connection.execute(q, [
        state,
        healthfacility,
      ]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  // ::::: 1D ::::://
  async IntermediateResult1D() {
    const q = IndicatorQuery.IntermediateResult1D();
    try {
      const [result]: any = await this.connection.execute(q);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async StateIntermediateResult1D(state: string) {
    const q = IndicatorQuery.StateIntermediateResult1D();
    try {
      const [result]: any = await this.connection.execute(q, [state]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async LgaIntermediateResult1D(state: string, lga: string) {
    const q = IndicatorQuery.IntermediateResult1D();
    try {
      const [result]: any = await this.connection.execute(q, [state, lga]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult1D(
    state: string,
    healthfacility: string
  ) {
    const q = IndicatorQuery.HealthfacilityIntermediateResult1D();
    try {
      const [result]: any = await this.connection.execute(q, [
        state,
        healthfacility,
      ]);
      return result;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}
