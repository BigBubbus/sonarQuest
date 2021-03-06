import {WorldService} from './../../../../services/world.service';
import {AdminSonarCubeSelectBackgroundComponent} from './components/admin-sonar-cube-select-background/admin-sonar-cube-select-background.component';
import {MatDialog} from '@angular/material';
import {Component, OnInit} from '@angular/core';
import {SonarCubeService} from '../../../../services/sonar-cube.service';
import {SonarCubeConfig} from '../../../../Interfaces/SonarCubeConfig';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-admin-sonar-cube',
  templateUrl: './admin-sonar-cube.component.html',
  styleUrls: ['./admin-sonar-cube.component.css']
})
export class AdminSonarCubeComponent implements OnInit {

  configName: string;

  sonarCubeUrl: string;

  projectName: string;

  sonarConfig: SonarCubeConfig;

  image: string;

  constructor(private sonarCubeService: SonarCubeService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private worldService: WorldService) {
  }

  ngOnInit() {
    this.sonarCubeService.getConfigs().subscribe(configs => {
        this.sonarConfig = configs[0];
        if (this.sonarConfig) {
          this.aktualisiereFormGroup();
        }
      }
    );

    const world = this.worldService.getCurrentWorld();
    if (world != null) {
      this.image = world.image;
    }
  }

  private aktualisiereFormGroup() {
    this.configName = this.sonarConfig.name;
    this.sonarCubeUrl = this.sonarConfig.sonarServerUrl;
    this.projectName = this.sonarConfig.sonarProject;
  }

  checkSonarCubeUrl() {
    // TODO
    const message = 'Sonar URL is reachable';
    this.snackBar.open(message, null, {duration: 2500});
  }

  checkProjectname() {
    this.sonarCubeService.getConfigs().subscribe(configs => {
      let enthalten = false;
      for (const config of configs) {
        if (config.sonarProject === this.projectName) {
          enthalten = true;
          break;
        }
      }
      const message: string = enthalten ? 'Sonar Project does exist' : 'Sonar Project does not exists';
      this.snackBar.open(message, null, {duration: 2500});
    });

  }

  save() {
    const config: SonarCubeConfig = {name: this.configName, sonarServerUrl: this.sonarCubeUrl, sonarProject: this.projectName};
    console.log('saving' + config + config.name + config.sonarServerUrl + config.sonarProject);
    this.sonarCubeService.saveConfig(config);
  }

  selectBackground() {
    this.dialog.open(AdminSonarCubeSelectBackgroundComponent, {panelClass: 'dialog-sexy', width: '500px'}).afterClosed().subscribe(
      result => {
        if (result) {
          this.image = result
        }
      }
    );
  }

}
