import { Construct } from "constructs";
import { App, TerraformStack, CloudBackend, NamedCloudWorkspace } from "cdktf";
import * as google from '@cdktf/provider-google';

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    const project_id = 'legendary-octo-potato';

    new google.GoogleProvider(this, 'Google', {
      project: project_id,
    });

    new google.CloudbuildTrigger(this, 'cloud_build', {
      filename: 'cloudbuild.yaml',
      github: {
        owner: 'hsmtkk',
        name: 'legendary-octo-potato',
        push: {
          branch: '^main$',
        },
      },
    });
  }
}

const app = new App();
const stack = new MyStack(app, "legendary-octo-potato");
new CloudBackend(stack, {
  hostname: "app.terraform.io",
  organization: "hsmtkkdefault",
  workspaces: new NamedCloudWorkspace("legendary-octo-potato")
});
app.synth();
