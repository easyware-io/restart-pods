# easyware-io/restart-pods@v1

![CI](https://github.com/easyware-io/restart-pods/actions/workflows/build.yml/badge.svg)

Restart all pods in a given namespace.

## Usage

### Basic usage

```yaml
- name: Restart all pods
  uses: easyware-io/restart-pods@v1
  with:
    namespace: my_namespace
```
