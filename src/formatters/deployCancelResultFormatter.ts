/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import { getString } from '@salesforce/ts-types';
import { DeployResult, MetadataApiDeployStatus } from '@salesforce/source-deploy-retrieve';
import { Ux } from '@salesforce/sf-plugins-core';
import { ResultFormatter } from './resultFormatter';

export type DeployCancelCommandResult = MetadataApiDeployStatus;

export class DeployCancelResultFormatter extends ResultFormatter {
  protected result: DeployResult;

  public constructor(ux: Ux, result: DeployResult) {
    super(ux);
    this.result = result;
  }

  public getJson(): DeployCancelCommandResult {
    return this.result.response;
  }

  public display(): void {
    const deployId = getString(this.result, 'response.id');
    if (this.isSuccess()) {
      this.ux.log(`Successfully canceled ${deployId}`);
    } else {
      let errMsg = `Could not cancel ${deployId}`;
      const errMsgDueTo = getString(this.result, 'response.errorMessage');
      if (errMsgDueTo) {
        errMsg = `${errMsg} Due to: ${errMsgDueTo}`;
      }
      this.ux.warn(errMsg);
    }
  }
}
