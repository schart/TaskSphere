'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">tasksphere-backend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-9e73b4f6a2e534daf40749be0917b4ab9e93730bdbed984d513baaa46553c7f6dfee52971e3b3a7016bb40c9e709e654a56dcfce1eacce6532461f6621d85fc4"' : 'data-bs-target="#xs-controllers-links-module-AppModule-9e73b4f6a2e534daf40749be0917b4ab9e93730bdbed984d513baaa46553c7f6dfee52971e3b3a7016bb40c9e709e654a56dcfce1eacce6532461f6621d85fc4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-9e73b4f6a2e534daf40749be0917b4ab9e93730bdbed984d513baaa46553c7f6dfee52971e3b3a7016bb40c9e709e654a56dcfce1eacce6532461f6621d85fc4"' :
                                            'id="xs-controllers-links-module-AppModule-9e73b4f6a2e534daf40749be0917b4ab9e93730bdbed984d513baaa46553c7f6dfee52971e3b3a7016bb40c9e709e654a56dcfce1eacce6532461f6621d85fc4"' }>
                                            <li class="link">
                                                <a href="controllers/ControllerAuth.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ControllerAuth</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/ControllerProject.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ControllerProject</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/ControllerUser.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ControllerUser</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-9e73b4f6a2e534daf40749be0917b4ab9e93730bdbed984d513baaa46553c7f6dfee52971e3b3a7016bb40c9e709e654a56dcfce1eacce6532461f6621d85fc4"' : 'data-bs-target="#xs-injectables-links-module-AppModule-9e73b4f6a2e534daf40749be0917b4ab9e93730bdbed984d513baaa46553c7f6dfee52971e3b3a7016bb40c9e709e654a56dcfce1eacce6532461f6621d85fc4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-9e73b4f6a2e534daf40749be0917b4ab9e93730bdbed984d513baaa46553c7f6dfee52971e3b3a7016bb40c9e709e654a56dcfce1eacce6532461f6621d85fc4"' :
                                        'id="xs-injectables-links-module-AppModule-9e73b4f6a2e534daf40749be0917b4ab9e93730bdbed984d513baaa46553c7f6dfee52971e3b3a7016bb40c9e709e654a56dcfce1eacce6532461f6621d85fc4"' }>
                                        <li class="link">
                                            <a href="injectables/RepositoryAuth.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RepositoryAuth</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RepositoryProject.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RepositoryProject</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/RepositoryUser.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RepositoryUser</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ServiceAuth.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServiceAuth</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ServiceProject.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ServiceProject</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StrategyGoogleOauth.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StrategyGoogleOauth</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StrategyJwt.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StrategyJwt</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/ControllerAuth.html" data-type="entity-link" >ControllerAuth</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/DtoProjectCreate.html" data-type="entity-link" >DtoProjectCreate</a>
                            </li>
                            <li class="link">
                                <a href="classes/DtoProjectUpdate.html" data-type="entity-link" >DtoProjectUpdate</a>
                            </li>
                            <li class="link">
                                <a href="classes/GlobalExceptionFilter.html" data-type="entity-link" >GlobalExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/GuardGoogleOauth.html" data-type="entity-link" >GuardGoogleOauth</a>
                            </li>
                            <li class="link">
                                <a href="classes/Permission.html" data-type="entity-link" >Permission</a>
                            </li>
                            <li class="link">
                                <a href="classes/Project.html" data-type="entity-link" >Project</a>
                            </li>
                            <li class="link">
                                <a href="classes/ProjectWorker.html" data-type="entity-link" >ProjectWorker</a>
                            </li>
                            <li class="link">
                                <a href="classes/Repository.html" data-type="entity-link" >Repository</a>
                            </li>
                            <li class="link">
                                <a href="classes/RevokedToken.html" data-type="entity-link" >RevokedToken</a>
                            </li>
                            <li class="link">
                                <a href="classes/Role.html" data-type="entity-link" >Role</a>
                            </li>
                            <li class="link">
                                <a href="classes/RolesPermissions.html" data-type="entity-link" >RolesPermissions</a>
                            </li>
                            <li class="link">
                                <a href="classes/Task.html" data-type="entity-link" >Task</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserToken.html" data-type="entity-link" >UserToken</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/GuardJwtAuth.html" data-type="entity-link" >GuardJwtAuth</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GuardNoJwtTokenAuth.html" data-type="entity-link" >GuardNoJwtTokenAuth</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GuardShouldBeOwnerOfReq.html" data-type="entity-link" >GuardShouldBeOwnerOfReq</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RepositoryAuth.html" data-type="entity-link" >RepositoryAuth</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RepositoryUser.html" data-type="entity-link" >RepositoryUser</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResponseInterceptor.html" data-type="entity-link" >ResponseInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StrategyGoogleOauth.html" data-type="entity-link" >StrategyGoogleOauth</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/InterfaceCredentials.html" data-type="entity-link" >InterfaceCredentials</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InterfaceJwtPayload.html" data-type="entity-link" >InterfaceJwtPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InterfaceProjectAttributes.html" data-type="entity-link" >InterfaceProjectAttributes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InterfaceProjectCreation.html" data-type="entity-link" >InterfaceProjectCreation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InterfaceProjectId.html" data-type="entity-link" >InterfaceProjectId</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InterfaceProjectUpdate.html" data-type="entity-link" >InterfaceProjectUpdate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InterfaceUserAttributes.html" data-type="entity-link" >InterfaceUserAttributes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InterfaceUserCreation.html" data-type="entity-link" >InterfaceUserCreation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InterfaceUserEmail.html" data-type="entity-link" >InterfaceUserEmail</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InterfaceUserId.html" data-type="entity-link" >InterfaceUserId</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/InterfaceUserUpdate.html" data-type="entity-link" >InterfaceUserUpdate</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserTokenAttributes.html" data-type="entity-link" >UserTokenAttributes</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});