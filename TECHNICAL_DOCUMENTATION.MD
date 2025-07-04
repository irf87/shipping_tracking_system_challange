# Technical Documentation

## Project Architecture Overview

This project implements a **Hexagonal Architecture (Ports and Adapters)** pattern to separate business logic from framework-specific code, enabling better scalability, maintainability, and testability.

## Project Structure

```
src/
├── app/                    # Next.js application layer
├── core/                   # Shared utilities and types
├── design-system/          # Reusable UI components
├── domains/                # Business domains (Hexagonal Architecture)
├── lib/                    # Framework-specific utilities
└── generated/              # Auto-generated files
```

## Architecture Layers

### 1. App Layer (`src/app/`)
**Framework-specific implementation layer**
- Next.js pages, layouts, and API routes
- Handles routing, server-side rendering, and HTTP requests
- Minimal business logic - delegates to domain layers

### 2. Core Layer (`src/core/`)
**Shared utilities and common types**
- `types/` - Shared TypeScript interfaces and types
- `utils/` - Common utility functions and helpers
- Framework-agnostic code used across multiple domains

### 3. Design System (`src/design-system/`)
**Reusable UI components following atomic design**
- `atoms/` - Basic building blocks (buttons, inputs, etc.)
- `templates/` - Page-level component compositions
- Framework-agnostic UI components

### 4. Domains (`src/domains/`)
**Business domains implementing Hexagonal Architecture**

Each domain follows the hexagonal architecture pattern with three layers:

#### Domain Layer (`domain/`)
- **Business entities** - Core business objects
- **Business rules** - Domain logic and validation
- **Use case interfaces** - Contracts for business operations
- **Framework-independent** - No external dependencies

#### Application Layer (`application/`)
- **Use case implementations** - Business logic orchestration
- **Application services** - Coordinates between domain and infrastructure
- **Business workflow** - Implements domain use cases

#### Infrastructure Layer (`infrastructure/`)
- **Repository implementations** - Data access layer
- **External service adapters** - API integrations
- **Framework-specific implementations** - Database, HTTP, etc.

#### Presentation Layer (`presentation/`)
- **React components** - UI for the domain
- **Hooks** - Custom React hooks for domain logic
- **Forms** - Domain-specific form components

### 5. Lib (`src/lib/`)
**Framework-specific utilities**
- Authentication middleware
- JWT utilities
- Cookie management
- Theme configuration

## Hexagonal Architecture Benefits

### Separation of Concerns
- **Business Logic**: Isolated in domain and application layers
- **Framework Logic**: Confined to presentation and infrastructure layers
- **UI Components**: Separated in design system

### Scalability Advantages
1. **Independent Development**: Teams can work on different domains simultaneously
2. **Technology Flexibility**: Easy to swap frameworks or databases
3. **Testing**: Business logic can be tested independently
4. **Maintenance**: Changes in one layer don't affect others

### Domain Structure Example
```
domains/auth/
├── domain/
│   ├── auth.ts              # Business entities and rules
│   └── authEntity.ts        # Core domain objects
├── application/
│   └── authUseCase.ts       # Business logic orchestration
├── infrastructure/
│   └── authRepositoryImpl.ts # Data access implementation
└── presentation/
    ├── FormLogin.tsx        # UI components
    └── hooks/
        └── useAuth.tsx      # React hooks
```

## Development Principles

### 1. Dependency Inversion
- High-level modules don't depend on low-level modules
- Both depend on abstractions
- Abstractions don't depend on details

### 2. Single Responsibility
- Each layer has a specific responsibility
- Components do one thing well
- Clear boundaries between concerns

### 3. Framework Independence
- Business logic is framework-agnostic
- Easy to migrate between frameworks
- Testable without framework dependencies

## Migration and Evolution

This architecture enables:
- **Framework Migration**: Replace React/Next.js without touching business logic
- **Database Changes**: Swap PostgreSQL for MongoDB without affecting domain
- **API Evolution**: Modify endpoints without changing core business rules
- **Feature Addition**: Add new domains without affecting existing ones

## Testing Strategy

- **Unit Tests**: Domain and application layers
- **Integration Tests**: Infrastructure layer
- **Component Tests**: Presentation layer
- **E2E Tests**: App layer

This structure ensures that business logic remains stable while allowing flexibility in technology choices and implementation details.
