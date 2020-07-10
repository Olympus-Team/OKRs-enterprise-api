import { Controller, Post, Body, Put, Param, Delete, Get } from '@nestjs/common';

import { TeamEntity } from '@app/db/entities/team.entity';
import { TeamService } from './team.service';
import { TeamDTO } from './team.dto';

@Controller('/api/v1/teams')
export class TeamController {
  constructor(private _teamService: TeamService) {}

  @Get()
  public getTeams(): Promise<TeamEntity[]> {
    return this._teamService.getAllTeam();
  }

  @Get(':id')
  public getDetailTeam(@Param('id') id: number): Promise<TeamEntity> {
    return this._teamService.getDetailTeam(id);
  }

  @Post()
  public createTeam(@Body() team: TeamDTO): Promise<TeamEntity> {
    return this._teamService.createTeam(team);
  }

  @Put(':id')
  public updateTeam(@Param('id') id: number, @Body() data: TeamDTO): Promise<TeamEntity> {
    return this._teamService.updateTeam(id, data);
  }

  @Delete(':id')
  public deteleTeam(@Param('id') id: number): any {
    return this._teamService.deteleTeam(id);
  }
}
