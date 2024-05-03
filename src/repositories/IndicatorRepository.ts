import { PoolConnection } from "mysql2/promise";
import {
  IndicatorQuery,
  IntermediateResult2Query,
} from "../queries/admin/indicator";

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
    const q2 = IndicatorQuery.IntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q);
      const [denominator]: any = await this.connection.execute(q2);
      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async IntermediateResult1Awithdate(from: string, to: string) {
    const q = IndicatorQuery.IntermediateResult1Awithdate();
    const q2 = IndicatorQuery.IntermediateResult1Cdenominatorwithdate();

    try {
      const [numerator]: any = await this.connection.execute(q, [from, to]);
      const [denominator]: any = await this.connection.execute(q2, [from, to]);
      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult1A(state: string) {
    const q = IndicatorQuery.StateIntermediateResult1A();
    const q2 = IndicatorQuery.StateIntermediateResult1Cdenominator();

    try {
      const [numerator]: any = await this.connection.execute(q, [state]);
      const [denominator]: any = await this.connection.execute(q2, [state]);
      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult1Awithdate(
    state: string,
    from: string,
    to: string
  ) {
    const q = IndicatorQuery.StateIntermediateResult1Awithdate();
    const q2 = IndicatorQuery.StateIntermediateResult1Cdenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        from,
        to,
      ]);
      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async LgaIntermediateResult1A(state: string, lga: string) {
    const q = IndicatorQuery.LgaIntermediateResult1A();
    const q2 = IndicatorQuery.LgaIntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [state, lga]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
      ]);
      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
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
    const q2 = IndicatorQuery.LgaIntermediateResult1Cdenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        lga,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
        from,
        to,
      ]);
      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult1A(
    state: string,
    healthfacility: string
  ) {
    const q = IndicatorQuery.HealthfacilityIntermediateResult1A();
    const q2 = IndicatorQuery.HealthfacilityIntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
      ]);
      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
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
    const q2 =
      IndicatorQuery.HealthfacilityIntermediateResult1Cdenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
        from,
        to,
      ]);
      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  //::::: 1B :::::: //
  async IntermediateResult1B() {
    const q = IndicatorQuery.IntermediateResult1Cdenominator();
    const q2 = IndicatorQuery.IntermediateResult1B();
    try {
      const [numerator]: any = await this.connection.execute(q);
      const [denominator]: any = await this.connection.execute(q2);
      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async IntermediateResult1Bwithdate(from: string, to: string) {
    const q = IndicatorQuery.IntermediateResult1Cdenominatorwithdate();
    const q2 = IndicatorQuery.IntermediateResult1Bwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [from, to]);
      const [denominator]: any = await this.connection.execute(q2, [from, to]);
      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult1B(state: string) {
    const q = IndicatorQuery.StateIntermediateResult1Cdenominator();
    const q2 = IndicatorQuery.StateIntermediateResult1B();
    try {
      const [numerator]: any = await this.connection.execute(q, [state]);
      const [denominator]: any = await this.connection.execute(q2, [state]);
      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult1Bwithdate(
    state: string,
    from: string,
    to: string
  ) {
    const q = IndicatorQuery.StateIntermediateResult1Cdenominatorwithdate();
    const q2 = IndicatorQuery.StateIntermediateResult1Bwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        from,
        to,
      ]);
      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async LgaIntermediateResult1B(state: string, lga: string) {
    const q = IndicatorQuery.LgaIntermediateResult1Cdenominator();
    const q2 = IndicatorQuery.LgaIntermediateResult1B();
    try {
      const [numerator]: any = await this.connection.execute(q, [state, lga]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
      ]);
      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async LgaIntermediateResult1Bwithdate(
    state: string,
    lga: string,
    from: string,
    to: string
  ) {
    const q = IndicatorQuery.LgaIntermediateResult1Cdenominatorwithdate();
    const q2 = IndicatorQuery.LgaIntermediateResult1Bwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        lga,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
        from,
        to,
      ]);
      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult1B(
    state: string,
    healthfacility: string
  ) {
    const q = IndicatorQuery.HealthfacilityIntermediateResult1Cdenominator();
    const q2 = IndicatorQuery.HealthfacilityIntermediateResult1B();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
      ]);
      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult1Bwithdate(
    state: string,
    healthfacility: string,
    from: string,
    to: string
  ) {
    const q =
      IndicatorQuery.HealthfacilityIntermediateResult1Cdenominatorwithdate();
    const q2 = IndicatorQuery.HealthfacilityIntermediateResult1Bwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
        from,
        to,
      ]);
      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }

  // ::::: 1C ::::://
  async IntermediateResult1C() {
    const q = IndicatorQuery.IntermediateResult1Ddenominator();
    const q2 = IndicatorQuery.IntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q);
      const [denominator]: any = await this.connection.execute(q2);
      const lessThan20 = numerator
        .map((obj: { ega: string }) => {
          const egaParts = obj.ega.split(" ");
          if (egaParts.length >= 2) {
            return parseInt(egaParts[0]);
          }
          return 0;
        })
        .filter((value: number) => value < 20);
      return { numerator: lessThan20.length, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async IntermediateResult1Cwithdate(from: string, to: string) {
    const q = IndicatorQuery.IntermediateResult1Ddenominatorwithdate();
    const q2 = IndicatorQuery.IntermediateResult1Cdenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [from, to]);
      const [denominator]: any = await this.connection.execute(q2, [from, to]);
      const lessThan20 = numerator
        .map((obj: { ega: string }) => {
          const egaParts = obj.ega.split(" ");
          if (egaParts.length >= 2) {
            return parseInt(egaParts[0]);
          }
          return 0;
        })
        .filter((value: number) => value < 20);
      return { numerator: lessThan20.length, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult1C(state: string) {
    const q = IndicatorQuery.StateIntermediateResult1Ddenominator();
    const q2 = IndicatorQuery.StateIntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [state]);
      const [denominator]: any = await this.connection.execute(q2, [state]);
      const lessThan20 = numerator
        .map((obj: { ega: string }) => {
          const egaParts = obj.ega.split(" ");
          if (egaParts.length >= 2) {
            return parseInt(egaParts[0]);
          }
          return 0;
        })
        .filter((value: number) => value < 20);
      return { numerator: lessThan20.length, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult1Cwithdate(
    state: string,
    from: string,
    to: string
  ) {
    const q = IndicatorQuery.StateIntermediateResult1Ddenominatorwithdate();
    const q2 = IndicatorQuery.StateIntermediateResult1Cdenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        from,
        to,
      ]);
      const lessThan20 = numerator
        .map((obj: { ega: string }) => {
          const egaParts = obj.ega.split(" ");
          if (egaParts.length >= 2) {
            return parseInt(egaParts[0]);
          }
          return 0;
        })
        .filter((value: number) => value < 20);
      return { numerator: lessThan20.length, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async LgaIntermediateResult1C(state: string, lga: string) {
    const q = IndicatorQuery.LgaIntermediateResult1Ddenominator();
    const q2 = IndicatorQuery.LgaIntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [state, lga]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
      ]);
      const lessThan20 = numerator
        .map((obj: { ega: string }) => {
          const egaParts = obj.ega.split(" ");
          if (egaParts.length >= 2) {
            return parseInt(egaParts[0]);
          }
          return 0;
        })
        .filter((value: number) => value < 20);
      return { numerator: lessThan20.length, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async LgaIntermediateResult1Cwithdate(
    state: string,
    lga: string,
    from: string,
    to: string
  ) {
    const q = IndicatorQuery.LgaIntermediateResult1Ddenominatorwithdate();
    const q2 = IndicatorQuery.LgaIntermediateResult1Cdenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        lga,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
        from,
        to,
      ]);
      const lessThan20 = numerator
        .map((obj: { ega: string }) => {
          const egaParts = obj.ega.split(" ");
          if (egaParts.length >= 2) {
            return parseInt(egaParts[0]);
          }
          return 0;
        })
        .filter((value: number) => value < 20);
      return { numerator: lessThan20.length, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult1C(
    state: string,
    healthfacility: string
  ) {
    const q = IndicatorQuery.HealthfacilityIntermediateResult1Ddenominator();
    const q2 = IndicatorQuery.HealthfacilityIntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
      ]);
      const lessThan20 = numerator
        .map((obj: { ega: string }) => {
          const egaParts = obj.ega.split(" ");
          if (egaParts.length >= 2) {
            return parseInt(egaParts[0]);
          }
          return 0;
        })
        .filter((value: number) => value < 20);
      return { numerator: lessThan20.length, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult1Cwithdate(
    state: string,
    healthfacility: string,
    from: string,
    to: string
  ) {
    const q =
      IndicatorQuery.HealthfacilityIntermediateResult1Ddenominatorwithdate();
    const q2 =
      IndicatorQuery.HealthfacilityIntermediateResult1Cdenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
        from,
        to,
      ]);
      const lessThan20 = numerator
        .map((obj: { ega: string }) => {
          const egaParts = obj.ega.split(" ");
          if (egaParts.length >= 2) {
            return parseInt(egaParts[0]);
          }
          return 0;
        })
        .filter((value: number) => value < 20);
      return { numerator: lessThan20.length, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  // ::::: 1D ::::://
  async IntermediateResult1D() {
    const q = IndicatorQuery.IntermediateResult1DNumerator();
    const q2 = IndicatorQuery.IntermediateResult1Ddenominator();
    try {
      const [numerator]: any = await this.connection.execute(q);
      const [denominator]: any = await this.connection.execute(q2);
      const lessThan20 = denominator
        .map((obj: { ega: string }) => {
          const egaParts = obj.ega.split(" ");
          if (egaParts.length >= 2) {
            return parseInt(egaParts[0]);
          }
          return 0;
        })
        .filter((value: number) => value < 20);
      return { numerator, denominator: lessThan20.length };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async IntermediateResult1Dwithdate(from: string, to: string) {
    const q = IndicatorQuery.IntermediateResult1DNumeratorwithdate();
    const q2 = IndicatorQuery.IntermediateResult1Ddenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [from, to]);
      const [denominator]: any = await this.connection.execute(q2, [from, to]);
      const lessThan20 = denominator
        .map((obj: { ega: string }) => {
          const egaParts = obj.ega.split(" ");
          if (egaParts.length >= 2) {
            return parseInt(egaParts[0]);
          }
          return 0;
        })
        .filter((value: number) => value < 20);
      return { numerator, denominator: lessThan20.length };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult1D(state: string) {
    const q = IndicatorQuery.StateIntermediateResult1DNumerator();
    const q2 = IndicatorQuery.StateIntermediateResult1Ddenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [state]);
      const [denominator]: any = await this.connection.execute(q2, [state]);
      const lessThan20 = denominator
        .map((obj: { ega: string }) => {
          const egaParts = obj.ega.split(" ");
          if (egaParts.length >= 2) {
            return parseInt(egaParts[0]);
          }
          return 0;
        })
        .filter((value: number) => value < 20);
      return { numerator, denominator: lessThan20.length };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult1Dwithdate(
    state: string,
    from: string,
    to: string
  ) {
    const q = IndicatorQuery.StateIntermediateResult1DNumeratorwithdate();
    const q2 = IndicatorQuery.StateIntermediateResult1Ddenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        from,
        to,
      ]);
      const lessThan20 = denominator
        .map((obj: { ega: string }) => {
          const egaParts = obj.ega.split(" ");
          if (egaParts.length >= 2) {
            return parseInt(egaParts[0]);
          }
          return 0;
        })
        .filter((value: number) => value < 20);
      return { numerator, denominator: lessThan20.length };
    } catch (err: any) {
      console.log(err);
    }
  }
  async LgaIntermediateResult1D(state: string, lga: string) {
    const q = IndicatorQuery.LgaIntermediateResult1DNumerator();
    const q2 = IndicatorQuery.LgaIntermediateResult1Ddenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [state, lga]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
      ]);
      const lessThan20 = denominator
        .map((obj: { ega: string }) => {
          const egaParts = obj.ega.split(" ");
          if (egaParts.length >= 2) {
            return parseInt(egaParts[0]);
          }
          return 0;
        })
        .filter((value: number) => value < 20);
      return { numerator, denominator: lessThan20.length };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async LgaIntermediateResult1Dwithdate(
    state: string,
    lga: string,
    from: string,
    to: string
  ) {
    const q = IndicatorQuery.LgaIntermediateResult1DNumeratorwithdate();
    const q2 = IndicatorQuery.LgaIntermediateResult1Ddenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        lga,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
        from,
        to,
      ]);
      const lessThan20 = denominator
        .map((obj: { ega: string }) => {
          const egaParts = obj.ega.split(" ");
          if (egaParts.length >= 2) {
            return parseInt(egaParts[0]);
          }
          return 0;
        })
        .filter((value: number) => value < 20);
      return { numerator, denominator: lessThan20.length };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult1D(
    state: string,
    healthfacility: string
  ) {
    const q = IndicatorQuery.HealthfacilityIntermediateResult1DNumerator();
    const q2 = IndicatorQuery.HealthfacilityIntermediateResult1Ddenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
      ]);
      const lessThan20 = denominator
        .map((obj: { ega: string }) => {
          const egaParts = obj.ega.split(" ");
          if (egaParts.length >= 2) {
            return parseInt(egaParts[0]);
          }
          return 0;
        })
        .filter((value: number) => value < 20);
      return { numerator, denominator: lessThan20.length };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult1Dwithdate(
    state: string,
    healthfacility: string,
    from: string,
    to: string
  ) {
    const q =
      IndicatorQuery.HealthfacilityIntermediateResult1DNumeratorwithdate();
    const q2 =
      IndicatorQuery.HealthfacilityIntermediateResult1Ddenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
        from,
        to,
      ]);
      const lessThan20 = denominator
        .map((obj: { ega: string }) => {
          const egaParts = obj.ega.split(" ");
          if (egaParts.length >= 2) {
            return parseInt(egaParts[0]);
          }
          return 0;
        })
        .filter((value: number) => value < 20);
      return { numerator, denominator: lessThan20.length };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  // ::::: 1E ::::://
  async IntermediateResult1E() {
    const q = IndicatorQuery.IntermediateResult1ENumerator();
    const q2 = IndicatorQuery.IntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q);
      const [denominator]: any = await this.connection.execute(q2);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async IntermediateResult1Ewithdate(from: string, to: string) {
    const q = IndicatorQuery.IntermediateResult1ENumeratorwithdate();
    const q2 = IndicatorQuery.IntermediateResult1Cdenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [from, to]);
      const [denominator]: any = await this.connection.execute(q2, [from, to]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult1E(state: string) {
    const q = IndicatorQuery.StateIntermediateResult1ENumerator();
    const q2 = IndicatorQuery.StateIntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [state]);
      const [denominator]: any = await this.connection.execute(q2, [state]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult1Ewithdate(
    state: string,
    from: string,
    to: string
  ) {
    const q = IndicatorQuery.StateIntermediateResult1ENumeratorwithdate();
    const q2 = IndicatorQuery.StateIntermediateResult1Cdenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async LgaIntermediateResult1E(state: string, lga: string) {
    const q = IndicatorQuery.LgaIntermediateResult1ENumerator();
    const q2 = IndicatorQuery.LgaIntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [state, lga]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async LgaIntermediateResult1Ewithdate(
    state: string,
    lga: string,
    from: string,
    to: string
  ) {
    const q = IndicatorQuery.LgaIntermediateResult1ENumeratorwithdate();
    const q2 = IndicatorQuery.LgaIntermediateResult1Cdenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        lga,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult1E(
    state: string,
    healthfacility: string
  ) {
    const q = IndicatorQuery.HealthfacilityIntermediateResult1ENumerator();
    const q2 = IndicatorQuery.HealthfacilityIntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult1Ewithdate(
    state: string,
    healthfacility: string,
    from: string,
    to: string
  ) {
    const q =
      IndicatorQuery.HealthfacilityIntermediateResult1ENumeratorwithdate();
    const q2 =
      IndicatorQuery.HealthfacilityIntermediateResult1Cdenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  // ::::: 1F ::::://
  async IntermediateResult1F() {
    const q = IndicatorQuery.IntermediateResult1FNumerator();
    const q2 = IndicatorQuery.IntermediateResult1Fdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q);
      const [denominator]: any = await this.connection.execute(q2);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async IntermediateResult1Fwithdate(from: string, to: string) {
    const q = IndicatorQuery.IntermediateResult1FNumeratorwithdate();
    const q2 = IndicatorQuery.IntermediateResult1Fdenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [from, to]);
      const [denominator]: any = await this.connection.execute(q2, [from, to]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult1F(state: string) {
    const q = IndicatorQuery.StateIntermediateResult1FNumerator();
    const q2 = IndicatorQuery.StateIntermediateResult1Fdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [state]);
      const [denominator]: any = await this.connection.execute(q2, [state]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult1Fwithdate(
    state: string,
    from: string,
    to: string
  ) {
    const q = IndicatorQuery.StateIntermediateResult1FNumeratorwithdate();
    const q2 = IndicatorQuery.StateIntermediateResult1Fdenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async LgaIntermediateResult1F(state: string, lga: string) {
    const q = IndicatorQuery.LgaIntermediateResult1FNumerator();
    const q2 = IndicatorQuery.LgaIntermediateResult1Fdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [state, lga]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async LgaIntermediateResult1Fwithdate(
    state: string,
    lga: string,
    from: string,
    to: string
  ) {
    const q = IndicatorQuery.LgaIntermediateResult1FNumeratorwithdate();
    const q2 = IndicatorQuery.LgaIntermediateResult1Fdenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        lga,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult1F(
    state: string,
    healthfacility: string
  ) {
    const q = IndicatorQuery.HealthfacilityIntermediateResult1FNumerator();
    const q2 = IndicatorQuery.HealthfacilityIntermediateResult1Fdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult1Fwithdate(
    state: string,
    healthfacility: string,
    from: string,
    to: string
  ) {
    const q =
      IndicatorQuery.HealthfacilityIntermediateResult1FNumeratorwithdate();
    const q2 =
      IndicatorQuery.HealthfacilityIntermediateResult1Fdenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  // ::::: 2A ::::://
  async IntermediateResult2A() {
    const q = IntermediateResult2Query.IntermediateResult2ANumerator();
    const q2 = IntermediateResult2Query.IntermediateResult2Adenominator();
    try {
      const [numerator]: any = await this.connection.execute(q);
      const [denominator]: any = await this.connection.execute(q2);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async IntermediateResult2Awithdate(from: string, to: string) {
    const q = IntermediateResult2Query.IntermediateResult2ANumeratorwithdate();
    const q2 =
      IntermediateResult2Query.IntermediateResult2Adenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [from, to]);
      const [denominator]: any = await this.connection.execute(q2, [from, to]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult2A(state: string) {
    const q = IntermediateResult2Query.StateIntermediateResult2ANumerator();
    const q2 = IntermediateResult2Query.StateIntermediateResult2Adenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [state]);
      const [denominator]: any = await this.connection.execute(q2, [state]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult2Awithdate(
    state: string,
    from: string,
    to: string
  ) {
    const q =
      IntermediateResult2Query.StateIntermediateResult2ANumeratorwithdate();
    const q2 =
      IntermediateResult2Query.StateIntermediateResult2Adenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async LgaIntermediateResult2A(state: string, lga: string) {
    const q = IntermediateResult2Query.LgaIntermediateResult2A();
    const q2 = IntermediateResult2Query.LgaIntermediateResult2Adenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [state, lga]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async LgaIntermediateResult2Awithdate(
    state: string,
    lga: string,
    from: string,
    to: string
  ) {
    const q = IntermediateResult2Query.LgaIntermediateResult2Awithdate();
    const q2 =
      IntermediateResult2Query.LgaIntermediateResult2Adenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        lga,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult2A(
    state: string,
    healthfacility: string
  ) {
    const q = IntermediateResult2Query.HealthfacilityIntermediateResult2A();
    const q2 =
      IntermediateResult2Query.HealthfacilityIntermediateResult2Adenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult2Awithdate(
    state: string,
    healthfacility: string,
    from: string,
    to: string
  ) {
    const q =
      IntermediateResult2Query.HealthfacilityIntermediateResult2Awithdate();
    const q2 =
      IntermediateResult2Query.HealthfacilityIntermediateResult2Adenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  // ::::: 2B ::::://
  async IntermediateResult2B() {
    const q = IntermediateResult2Query.IntermediateResult2BNumerator();
    const q2 = IndicatorQuery.IntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q);
      const [denominator]: any = await this.connection.execute(q2);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async IntermediateResult2Bwithdate(from: string, to: string) {
    const q = IntermediateResult2Query.IntermediateResult2BNumeratorwithdate();
    const q2 = IndicatorQuery.IntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [from, to]);
      const [denominator]: any = await this.connection.execute(q2, [from, to]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult2B(state: string) {
    const q = IntermediateResult2Query.StateIntermediateResult2BNumerator();
    const q2 = IndicatorQuery.IntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [state]);
      const [denominator]: any = await this.connection.execute(q2, [state]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult2Bwithdate(
    state: string,
    from: string,
    to: string
  ) {
    const q =
      IntermediateResult2Query.StateIntermediateResult2BNumeratorwithdate();
    const q2 = IndicatorQuery.IntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async LgaIntermediateResult2B(state: string, lga: string) {
    const q = IntermediateResult2Query.LgaIntermediateResult2B();
    const q2 = IndicatorQuery.IntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [state, lga]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async LgaIntermediateResult2Bwithdate(
    state: string,
    lga: string,
    from: string,
    to: string
  ) {
    const q = IntermediateResult2Query.LgaIntermediateResult2Bwithdate();
    const q2 = IndicatorQuery.IntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        lga,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult2B(
    state: string,
    healthfacility: string
  ) {
    const q = IntermediateResult2Query.HealthfacilityIntermediateResult2B();
    const q2 = IndicatorQuery.IntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult2Bwithdate(
    state: string,
    healthfacility: string,
    from: string,
    to: string
  ) {
    const q =
      IntermediateResult2Query.HealthfacilityIntermediateResult2Bwithdate();
    const q2 = IndicatorQuery.IntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  // ::::: 2C ::::://
  async IntermediateResult2C() {
    const q = IntermediateResult2Query.IntermediateResult2CNumerator();
    const q2 = IntermediateResult2Query.IntermediateResult2BNumerator();
    try {
      const [numerator]: any = await this.connection.execute(q);
      const [denominator]: any = await this.connection.execute(q2);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async IntermediateResult2Cwithdate(from: string, to: string) {
    const q = IntermediateResult2Query.IntermediateResult2CNumeratorwithdate();
    const q2 = IntermediateResult2Query.IntermediateResult2BNumerator();
    try {
      const [numerator]: any = await this.connection.execute(q, [from, to]);
      const [denominator]: any = await this.connection.execute(q2, [from, to]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult2C(state: string) {
    const q = IntermediateResult2Query.StateIntermediateResult2CNumerator();
    const q2 = IntermediateResult2Query.IntermediateResult2BNumerator();
    try {
      const [numerator]: any = await this.connection.execute(q, [state]);
      const [denominator]: any = await this.connection.execute(q2, [state]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult2Cwithdate(
    state: string,
    from: string,
    to: string
  ) {
    const q =
      IntermediateResult2Query.StateIntermediateResult2CNumeratorwithdate();
    const q2 = IntermediateResult2Query.IntermediateResult2BNumerator();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async LgaIntermediateResult2C(state: string, lga: string) {
    const q = IntermediateResult2Query.LgaIntermediateResult2C();
    const q2 = IntermediateResult2Query.IntermediateResult2BNumerator();
    try {
      const [numerator]: any = await this.connection.execute(q, [state, lga]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async LgaIntermediateResult2Cwithdate(
    state: string,
    lga: string,
    from: string,
    to: string
  ) {
    const q = IntermediateResult2Query.LgaIntermediateResult2Cwithdate();
    const q2 = IntermediateResult2Query.IntermediateResult2BNumerator();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        lga,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult2C(
    state: string,
    healthfacility: string
  ) {
    const q = IntermediateResult2Query.HealthfacilityIntermediateResult2C();
    const q2 = IntermediateResult2Query.IntermediateResult2BNumerator();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult2Cwithdate(
    state: string,
    healthfacility: string,
    from: string,
    to: string
  ) {
    const q =
      IntermediateResult2Query.HealthfacilityIntermediateResult2Cwithdate();
    const q2 = IntermediateResult2Query.IntermediateResult2BNumerator();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  // ::::: 2D ::::://
  async IntermediateResult2D() {
    const q = IntermediateResult2Query.IntermediateResult2DNumerator();
    const q2 = IndicatorQuery.IntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q);
      const [denominator]: any = await this.connection.execute(q2);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async IntermediateResult2Dwithdate(from: string, to: string) {
    const q = IntermediateResult2Query.IntermediateResult2DNumeratorwithdate();
    const q2 = IndicatorQuery.IntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [from, to]);
      const [denominator]: any = await this.connection.execute(q2, [from, to]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult2D(state: string) {
    const q = IntermediateResult2Query.StateIntermediateResult2DNumerator();
    const q2 = IndicatorQuery.IntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [state]);
      const [denominator]: any = await this.connection.execute(q2, [state]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult2Dwithdate(
    state: string,
    from: string,
    to: string
  ) {
    const q =
      IntermediateResult2Query.StateIntermediateResult2DNumeratorwithdate();
    const q2 = IndicatorQuery.IntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async LgaIntermediateResult2D(state: string, lga: string) {
    const q = IntermediateResult2Query.LgaIntermediateResult2D();
    const q2 = IndicatorQuery.IntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [state, lga]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async LgaIntermediateResult2Dwithdate(
    state: string,
    lga: string,
    from: string,
    to: string
  ) {
    const q = IntermediateResult2Query.LgaIntermediateResult2Dwithdate();
    const q2 = IndicatorQuery.IntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        lga,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult2D(
    state: string,
    healthfacility: string
  ) {
    const q = IntermediateResult2Query.HealthfacilityIntermediateResult2D();
    const q2 = IndicatorQuery.IntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult2Dwithdate(
    state: string,
    healthfacility: string,
    from: string,
    to: string
  ) {
    const q =
      IntermediateResult2Query.HealthfacilityIntermediateResult2Dwithdate();
    const q2 = IndicatorQuery.IntermediateResult1Cdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  // ::::: 2E ::::://
  async IntermediateResult2E() {
    const q = IntermediateResult2Query.IntermediateResult2ENumerator();
    const q2 = IntermediateResult2Query.IntermediateResult2Edenominator();
    try {
      const [numerator]: any = await this.connection.execute(q);
      const [denominator]: any = await this.connection.execute(q2);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async IntermediateResult2Ewithdate(from: string, to: string) {
    const q = IntermediateResult2Query.IntermediateResult2ENumeratorwithdate();
    const q2 =
      IntermediateResult2Query.IntermediateResult2Edenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [from, to]);
      const [denominator]: any = await this.connection.execute(q2, [from, to]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult2E(state: string) {
    const q = IntermediateResult2Query.StateIntermediateResult2ENumerator();
    const q2 = IntermediateResult2Query.StateIntermediateResult2ENumerator();
    try {
      const [numerator]: any = await this.connection.execute(q, [state]);
      const [denominator]: any = await this.connection.execute(q2, [state]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult2Ewithdate(
    state: string,
    from: string,
    to: string
  ) {
    const q =
      IntermediateResult2Query.StateIntermediateResult2ENumeratorwithdate();
    const q2 =
      IntermediateResult2Query.StateIntermediateResult2Edenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async LgaIntermediateResult2E(state: string, lga: string) {
    const q = IntermediateResult2Query.LgaIntermediateResult2E();
    const q2 = IntermediateResult2Query.LgaIntermediateResult2E();
    try {
      const [numerator]: any = await this.connection.execute(q, [state, lga]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async LgaIntermediateResult2Ewithdate(
    state: string,
    lga: string,
    from: string,
    to: string
  ) {
    const q = IntermediateResult2Query.LgaIntermediateResult2Ewithdate();
    const q2 =
      IntermediateResult2Query.LgaIntermediateResult2Edenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        lga,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult2E(
    state: string,
    healthfacility: string
  ) {
    const q = IntermediateResult2Query.HealthfacilityIntermediateResult2E();
    const q2 =
      IntermediateResult2Query.HealthfacilityIntermediateResult2Edenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult2Ewithdate(
    state: string,
    healthfacility: string,
    from: string,
    to: string
  ) {
    const q =
      IntermediateResult2Query.HealthfacilityIntermediateResult2Ewithdate();
    const q2 =
      IntermediateResult2Query.HealthfacilityIntermediateResult2Edenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  // ::::: 2F ::::://
  async IntermediateResult2F() {
    const q = IntermediateResult2Query.IntermediateResult2FNumerator();
    const q2 = IntermediateResult2Query.IntermediateResult2Fdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q);
      const [denominator]: any = await this.connection.execute(q2);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async IntermediateResult2Fwithdate(from: string, to: string) {
    const q = IntermediateResult2Query.IntermediateResult2FNumeratorwithdate();
    const q2 =
      IntermediateResult2Query.IntermediateResult2Fdenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [from, to]);
      const [denominator]: any = await this.connection.execute(q2, [from, to]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult2F(state: string) {
    const q = IntermediateResult2Query.StateIntermediateResult2FNumerator();
    const q2 = IntermediateResult2Query.StateIntermediateResult2FNumerator();
    try {
      const [numerator]: any = await this.connection.execute(q, [state]);
      const [denominator]: any = await this.connection.execute(q2, [state]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult2Fwithdate(
    state: string,
    from: string,
    to: string
  ) {
    const q =
      IntermediateResult2Query.StateIntermediateResult2FNumeratorwithdate();
    const q2 =
      IntermediateResult2Query.StateIntermediateResult2Fdenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async LgaIntermediateResult2F(state: string, lga: string) {
    const q = IntermediateResult2Query.LgaIntermediateResult2F();
    const q2 = IntermediateResult2Query.LgaIntermediateResult2F();
    try {
      const [numerator]: any = await this.connection.execute(q, [state, lga]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async LgaIntermediateResult2Fwithdate(
    state: string,
    lga: string,
    from: string,
    to: string
  ) {
    const q = IntermediateResult2Query.LgaIntermediateResult2Fwithdate();
    const q2 =
      IntermediateResult2Query.LgaIntermediateResult2Fdenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        lga,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult2F(
    state: string,
    healthfacility: string
  ) {
    const q = IntermediateResult2Query.HealthfacilityIntermediateResult2F();
    const q2 =
      IntermediateResult2Query.HealthfacilityIntermediateResult2Fdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult2Fwithdate(
    state: string,
    healthfacility: string,
    from: string,
    to: string
  ) {
    const q =
      IntermediateResult2Query.HealthfacilityIntermediateResult2Fwithdate();
    const q2 =
      IntermediateResult2Query.HealthfacilityIntermediateResult2Fdenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  // ::::: 2G ::::://
  async IntermediateResult2G() {
    const q = IntermediateResult2Query.IntermediateResult2GNumerator();
    const q2 = IntermediateResult2Query.IntermediateResult2Gdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q);
      const [denominator]: any = await this.connection.execute(q2);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async IntermediateResult2Gwithdate(from: string, to: string) {
    const q = IntermediateResult2Query.IntermediateResult2GNumeratorwithdate();
    const q2 =
      IntermediateResult2Query.IntermediateResult2Gdenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [from, to]);
      const [denominator]: any = await this.connection.execute(q2, [from, to]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult2G(state: string) {
    const q = IntermediateResult2Query.StateIntermediateResult2GNumerator();
    const q2 = IntermediateResult2Query.StateIntermediateResult2GNumerator();
    try {
      const [numerator]: any = await this.connection.execute(q, [state]);
      const [denominator]: any = await this.connection.execute(q2, [state]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async StateIntermediateResult2Gwithdate(
    state: string,
    from: string,
    to: string
  ) {
    const q =
      IntermediateResult2Query.StateIntermediateResult2GNumeratorwithdate();
    const q2 =
      IntermediateResult2Query.StateIntermediateResult2Gdenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async LgaIntermediateResult2G(state: string, lga: string) {
    const q = IntermediateResult2Query.LgaIntermediateResult2G();
    const q2 = IntermediateResult2Query.LgaIntermediateResult2G();
    try {
      const [numerator]: any = await this.connection.execute(q, [state, lga]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async LgaIntermediateResult2Gwithdate(
    state: string,
    lga: string,
    from: string,
    to: string
  ) {
    const q = IntermediateResult2Query.LgaIntermediateResult2Gwithdate();
    const q2 =
      IntermediateResult2Query.LgaIntermediateResult2Gdenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        lga,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        lga,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult2G(
    state: string,
    healthfacility: string
  ) {
    const q = IntermediateResult2Query.HealthfacilityIntermediateResult2G();
    const q2 =
      IntermediateResult2Query.HealthfacilityIntermediateResult2Gdenominator();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
  async HealthfacilityIntermediateResult2Gwithdate(
    state: string,
    healthfacility: string,
    from: string,
    to: string
  ) {
    const q =
      IntermediateResult2Query.HealthfacilityIntermediateResult2Gwithdate();
    const q2 =
      IntermediateResult2Query.HealthfacilityIntermediateResult2Gdenominatorwithdate();
    try {
      const [numerator]: any = await this.connection.execute(q, [
        state,
        healthfacility,
        from,
        to,
      ]);
      const [denominator]: any = await this.connection.execute(q2, [
        state,
        healthfacility,
        from,
        to,
      ]);

      return { numerator, denominator };
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }
}
